# Git-Workflow — ein Klon, ein Client-Repo

Dieses Dokument klärt, wie Git in einem Klon funktioniert. Es löst die häufigen Commit-Missverständnisse: Wohin committe ich? Verschmutze ich das Template? Muss ich einen Branch anlegen?

Kurzfassung: **Ein Klon ist ein eigenständiges Client-Repo. Du committest direkt auf `main`. Das Template ist nur die Startvorlage, kein dauerhafter Remote.**

## Das Modell

- Jeder Klon = ein privates, eigenständiges Repo für genau einen Kunden.
- `origin` zeigt auf das **Client-Repo**, nicht auf das Template.
- Der Deploy läuft aus `origin` (siehe `references/deployment.md`).
- Das Quell-OS (Website-AIOS Template) ist nur die Startvorlage beim Anlegen. Danach besteht keine Git-Verbindung mehr dorthin.
- **Kein Auto-Sync.** OS-Verbesserungen wandern nicht per Git, sondern über das KVP-Review (siehe `references/os-improvement.md`).

## Setup eines frischen Klons

1. Template als Startvorlage nehmen (Klon-Ordner ist bereits da).
2. Eigenes **privates** Client-Repo auf GitHub anlegen, z.B. `pascal635/website-{kunde}`.
3. `origin` auf dieses Repo setzen und ersten Commit pushen:

```bash
# im Klon-Ordner
git remote remove origin 2>/dev/null   # falls noch ein Template-Remote hängt
git remote add origin git@github.com:pascal635/website-{kunde}.git
git add -A
git commit -m "chore: init website-{kunde} from template"
git branch -M main
git push -u origin main
```

Danach: `git remote -v` zeigt nur noch das Client-Repo. Das Template taucht nirgends mehr auf.

## Commit-Regel

- **Direkt auf `main` committen.** Kein Branch-Zwang bei einem Solo-Client-Repo — es arbeitet niemand parallel, ein Feature-Branch bringt keinen Nutzen.
- Kleine, nachvollziehbare Commits. Nach jedem fertigen Schritt committen, nicht am Ende alles in einem Batch.
- **Conventional Commits** als Format:
  - `feat: leistungsseite dachsanierung`
  - `fix: hero-bild pfad korrigiert`
  - `content: startseite texte v2 nach freigabe`
  - `chore: .htaccess redirects ergänzt`

## Deploy

Push auf `main` → GitHub Actions baut und lädt hoch. Details, Hetzner-Besonderheiten und die `.htaccess`-Regeln stehen in `references/deployment.md`. Kurz: `npm ci` + `astro build`, Upload via FTPS (lftp) auf den Hetzner-Webspace.

## OS-Verbesserungen (kein Git-Weg)

Wenn dir im Klon etwas auffällt — Reibung oder ein Handwerks-Learning — kommt das **nicht** per Git zurück ins Template. Der Weg ist:

1. Sofort in `OS-FEEDBACK.md` loggen (Format siehe `references/os-improvement.md`).
2. Im KVP-Review analysiert Pascal die Einträge und entscheidet, was ins Quell-OS wandert.
3. Umsetzung passiert manuell im Template. Neue Projekte starten dann aus einem frischeren Klon.

So bleibt volle Kontrolle: Nichts fließt automatisch zwischen Klon und Template.

## FAQ

**Wohin committe ich?**
Auf `main` deines Client-Repos (`origin`). Immer direkt, kein Branch nötig.

**Muss ich einen Feature-Branch anlegen?**
Nein. Solo-Client-Repo → direkt auf `main`.

**Verschmutze ich das Template, wenn ich committe?**
Nein. Nach dem Setup zeigt `origin` auf dein Client-Repo. Das Template ist kein Remote mehr — du kannst es gar nicht mehr treffen. Prüfen mit `git remote -v`.

**Wie bekomme ich neue OS-Skills/References ins Projekt?**
Gar nicht per Git in ein laufendes Projekt. Verbesserungen laufen über das KVP-Review (`references/os-improvement.md`); neue Projekte bekommen sie automatisch, weil sie aus dem aktualisierten Template geklont werden.

**Ich habe aus Versehen noch den Template-Remote drin — was tun?**
`git remote remove origin`, dann das Client-Repo als neuen `origin` setzen (siehe Setup).
