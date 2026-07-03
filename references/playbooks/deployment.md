# Deployment-Playbook

> Zweck: Eine mit dem OS gebaute Astro-Seite zuverlaessig auf einen Hetzner-Webspace (Apache) bringen. Statischer Build, Deploy vollautomatisch bei jedem Push auf `main` via GitHub Actions, Upload per FTPS mit `lftp`. Backportet aus einem real funktionierenden Setup — die hier gezeigte `deploy.yml` laeuft in Produktion.

## Prinzipien

- **Statischer Astro-Build.** `astro build` erzeugt einen reinen `dist/`-Ordner (HTML/CSS/JS/Assets). Kein Node-Prozess auf dem Server, kein SSR. Der Webspace liefert nur Dateien aus.
- **Hetzner-Webspace / Apache.** Ziel ist Shared Hosting mit Apache, kein eigener Server. Steuerung ausschliesslich ueber `.htaccess` (Redirects, Header, Caching, 404). Kein root-Zugriff.
- **Alte Seite live lassen bis DNS-Cutover.** Die neue Seite wird zuerst vollstaendig gebaut, deployt und auf einer Test-URL (Subdomain oder Preview-Host) geprueft. Erst wenn sie steht, wird per DNS umgeschaltet. Niemals die alte Seite loeschen, bevor die neue verifiziert live ist. Rollback = DNS zurueckdrehen.
- **origin = Client-Repo.** Jeder Klon ist ein eigenstaendiges Client-Repo. Der Deploy laeuft aus diesem Repo. Direkt auf `main` committen (kein Branch-Zwang bei Solo-Client-Repo) — jeder Push auf `main` deployt.

## Schritt fuer Schritt

1. **Client-Repo anlegen.** Der Klon ist bereits ein Git-Repo. `origin` auf das Client-Repo (GitHub) setzen. `main` ist der Deploy-Branch.
2. **FTP-Zugang holen.** Im Hetzner-Konto einen FTP-Account fuer den Webspace anlegen (oder bestehenden nutzen). Notieren: Host, Benutzer, Passwort. Wichtig: Der FTP-Account sollte direkt ins Web-Root (`html/` bzw. den Dokumenten-Root der Domain) zeigen — sonst muss der `mirror`-Zielpfad angepasst werden.
3. **GitHub Secrets setzen.** Im Client-Repo unter *Settings -> Secrets and variables -> Actions* drei Secrets anlegen:
   - `FTP_SERVER` — z. B. `ftps://wXXXXXXX.kasserver.com` oder der Hetzner-FTP-Host
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
4. **Workflow einspielen.** `.github/workflows/deploy.yml` mit der Vorlage unten anlegen (Platzhalter sind bereits generisch, nur Secrets fuellen).
5. **Erster Deploy.** Push auf `main` oder Workflow manuell via *Actions -> Deploy -> Run workflow* starten. Der Job macht: `checkout -> setup-node -> npm ci -> npm run build -> lftp-Upload von `dist/`.
6. **Auf Test-URL pruefen.** Solange DNS noch auf die alte Seite zeigt, ueber die vom Hoster vergebene Vorschau-URL / Subdomain testen. Layout, Links, 404, Redirects, Formulare durchklicken.
7. **DNS-Cutover** (siehe Checkliste unten), erst nachdem die Seite steht.

## Warum lftp statt JS-FTP-Action

Die verbreiteten JavaScript-FTP-Actions (z. B. `FTP-Deploy-Action`) scheitern auf Hetzner-Webspace reproduzierbar mit `ECONNRESET` am Data-Socket: Hetzner erzwingt FTPS und schliesst die Datenverbindung der JS-Implementierung waehrend des Transfers. `lftp` (natives CLI) handhabt den FTPS-Data-Channel korrekt, kann Retries und Timeouts setzen und laeuft stabil durch. Deshalb: kein JS-FTP, sondern `apt-get install lftp` + `lftp -c`. Relevante Optionen:

- `set ftp:ssl-force true` + `set ftp:ssl-protect-data true` — FTPS erzwingen, auch fuer den Datenkanal.
- `set ssl:verify-certificate no` — Hetzner-Zertifikatskette wird sonst oft nicht validiert.
- `set net:max-retries 2` + `set net:timeout 20` — nicht endlos haengen.
- `mirror -R --delete --exclude-glob .git*` — lokales `dist/` nach remote spiegeln, verwaiste Dateien loeschen, `.git*` nie hochladen.

Achtung `--delete`: `mirror -R --delete` loescht auf dem Server alles, was nicht in `dist/` liegt. Nur nutzen, wenn der FTP-Root ausschliesslich dieser Seite gehoert. Liegen dort Fremddateien (z. B. die alte Seite im selben Verzeichnis), `--delete` weglassen oder in ein Unterverzeichnis mirrorn.

## deploy.yml — kopierbare Vorlage

```yaml
name: Deploy

# Baut die Astro-Seite und laedt dist/ per FTPS auf den Hetzner-Webspace.
# FTP-Zugang liegt als GitHub Secret (FTP_SERVER / FTP_USERNAME / FTP_PASSWORD).
on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: deploy-main
  cancel-in-progress: true

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: FTPS Deploy (lftp)
        env:
          FTP_SERVER: ${{ secrets.FTP_SERVER }}
          FTP_USERNAME: ${{ secrets.FTP_USERNAME }}
          FTP_PASSWORD: ${{ secrets.FTP_PASSWORD }}
        run: |
          sudo apt-get update -qq && sudo apt-get install -y -qq lftp
          lftp -c "
            set ftp:ssl-force true;
            set ftp:ssl-protect-data true;
            set ssl:verify-certificate no;
            set net:max-retries 2;
            set net:timeout 20;
            open -u \"$FTP_USERNAME\",\"$FTP_PASSWORD\" \"$FTP_SERVER\";
            mirror -R --delete --verbose --exclude-glob .git* ./dist/ ./;
          "
```

Anpassungen je Projekt:
- **Ziel-Unterverzeichnis:** Zeigt der FTP-Account nicht direkt ins Web-Root, den letzten `mirror`-Pfad `./` durch das Zielverzeichnis ersetzen (z. B. `./html/`).
- **Node-Version:** an `package.json` (`engines`) angleichen.
- **`--delete`:** bei geteiltem Verzeichnis entfernen (siehe Warnung oben).

## .htaccess-Muster

Die `.htaccess` gehoert nach `public/.htaccess` — Astro kopiert alles aus `public/` unveraendert nach `dist/`, damit landet sie im Web-Root. Muster:

```apache
# 301-Redirects: alte URLs -> neue Struktur (pro entfernter/umbenannter Seite eine Zeile)
Redirect 301 /alte-url/ /neue-url/
Redirect 301 /noch-eine-alte-url/ /passende-neue-url/

# Eigene 404-Seite
ErrorDocument 404 /404.html

# Security-Header
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header unset X-Powered-By
</IfModule>

# Kompression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml
</IfModule>

# Caching: gehashte Assets lange, HTML kurz
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 30 days"
  ExpiresByType application/javascript "access plus 30 days"
  ExpiresByType image/webp "access plus 30 days"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/svg+xml "access plus 30 days"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

Regeln:
- **301-Redirects:** Jede URL der alten Seite, die wegfaellt oder umzieht, bekommt eine Zeile alt -> neu. Das bewahrt Google-Rankings und vermeidet 404 fuer verlinkte alte Pfade. Vor Cutover die alte Sitemap / GSC-Top-URLs durchgehen und abbilden.
- **404:** `404.html` muss im Build existieren (Astro: `src/pages/404.astro`).
- **HTML `access plus 0 seconds`:** damit Textaenderungen nach dem naechsten Deploy sofort sichtbar sind. Gehashte Assets (CSS/JS/Bilder) duerfen lange cachen, weil Astro den Dateinamen bei Aenderung neu hasht.

## robots.txt / llms.txt

Beide nach `public/` legen (landen im Web-Root).

`public/robots.txt` — Suchmaschinen und KI-Antwortmaschinen zulassen (GEO), Sitemap referenzieren:

```
User-agent: *
Allow: /

# KI-Antwortmaschinen zulassen (GEO)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: ClaudeBot
Allow: /

Sitemap: https://DEINE-DOMAIN.de/sitemap-index.xml
```

`public/llms.txt` — kompakter Klartext-Steckbrief fuer LLMs: kurzer Intro-Blockquote (was ist das Unternehmen), dann Eckdaten (Firmierung, Adresse, Kontakt, Einzugsgebiet, USP), Leistungen als Linkliste mit einzeiliger Beschreibung, weitere Seiten. Ziel: eine KI kann das Unternehmen korrekt zusammenfassen und die richtigen Unterseiten verlinken. Domain und Inhalte pro Kunde fuellen.

## DNS-Cutover-Checkliste

1. Neue Seite ist auf Test-URL vollstaendig geprueft und freigegeben.
2. Alle 301-Redirects in `.htaccess` gesetzt (alte URLs abgebildet).
3. TTL des DNS-Eintrags vorab senken (z. B. auf 300 s), damit der Umschalt schnell greift — idealerweise 24 h vor Cutover.
4. A-/CNAME-Record der Domain (und `www`) auf den Hetzner-Webspace umstellen.
5. SSL-Zertifikat fuer die Live-Domain im Hetzner-Panel ausstellen/aktivieren (Let's Encrypt), Zwang auf HTTPS pruefen.
6. Nach Propagierung: Live-Domain durchklicken, HTTPS und Redirects (alt -> neu) testen.
7. Alte Seite noch nicht loeschen — einige Tage als Rollback-Option behalten.
8. Sitemap in der Google Search Console fuer die neue Domain einreichen.

## Checkliste vor Go-live

- [ ] `npm run build` laeuft lokal fehlerfrei durch, `dist/` sieht vollstaendig aus.
- [ ] `.htaccess`, `robots.txt`, `llms.txt` liegen in `public/` und erscheinen in `dist/`.
- [ ] `404.astro` existiert und wird zu `404.html` gebaut.
- [ ] Alle alten URLs als 301-Redirect abgebildet.
- [ ] GitHub Secrets `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD` gesetzt.
- [ ] Workflow-Lauf gruen, Upload ohne `ECONNRESET`.
- [ ] Test-URL geprueft: Layout, Navigation, Formulare, Meta-Tags, Schema, Ladezeit.
- [ ] Sitemap wird gebaut und ist erreichbar (`/sitemap-index.xml`).
- [ ] DNS-Cutover-Checkliste abgearbeitet.
- [ ] Alte Seite als Rollback bewahrt.
