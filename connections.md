# Connections

Registry der Datenquellen und Systeme, die dieses Website-AIOS erreichen kann. Die kunden­spezifischen Zeilen (Hosting, Domain, Monitore, Funnel) füllt `/onboard` aus den Intake-Antworten (W4/W5). Über die Zeit erweitern.

## OS-Fähigkeiten (Standard, kommen mit dem Template)

Diese Tools sind Teil jedes Klons und sofort nutzbar — keine pro-Kunde-Einrichtung nötig (außer API-Key, wo vermerkt).

| # | Schicht | Quelle | Liefert | Mechanismus | Auth | Zuletzt geprüft |
|---|---|---|---|---|---|---|
| 1 | Monitor | Sistrix | Sichtbarkeitsindex, Keywords, Wettbewerber | **mcp (in Umgebung vorhanden)** | API-Key nötig | — |
| 2 | Visuals | Gemini (Imagen 4) | KI-Web-Stills (Atmosphäre/Konzept) | **`script` `scripts/generate-image.mjs`** | GEMINI_API_KEY in .env · Modell `imagen-4.0-generate-001` | — |
| 3 | Visuals | Higgsfield | Cinematic/Video, Bild, Audio, 3D | **`mcp` (`.mcp.json`)** | OAuth | — |

## Kunden-Systeme (pro Klon, `/onboard` füllt aus)

Platzhalter — Werte und Auth-Details trägt `/onboard` pro Kunde ein. Default-Status `not yet connected`.

| # | Schicht | Quelle | Liefert | Mechanismus | Auth | Zuletzt geprüft |
|---|---|---|---|---|---|---|
| 4 | Build | Git-Repo | Single Source of Truth der Seite | git · `origin` = github.com/pascal635/website-steine-steuern (privat); Kit als Remote `aios-kit` | gh (pascal635) | 2026-07-03 ✅ |
| 5 | Build | Hosting (Hetzner-Webspace) | Auslieferung der Seite | **CI/CD** · Push auf `main` → GitHub Actions `deploy.yml` → Build → FTPS-Upload (lftp) nach dist/ | FTP-Account `steineaf_0` @ www549.your-server.de · Secrets im Repo (FTP_SERVER/USERNAME/PASSWORD) · lokal in `.env` | 2026-07-03 ✅ live |
| 6 | Build | Domain / Registrar | DNS, Go-Live-Records | Subdomain **friends.steine-steuern.de** → 178.105.73.247 (DNS steht, FTP-Root = Docroot) | — | 2026-07-03 ✅ live · SSL (Let's Encrypt, bis 01.10.2026) aktiv, HTTP→HTTPS + HSTS an |
| 7 | Monitor | Google Search Console | Impressions, Klicks, Rankings, Indexierung | not yet connected | → offen | — |
| 8 | Monitor | Google Ads | Kosten, Conversions, Suchbegriffe | not yet connected | → offen | — |
| 9 | Monitor | Meta Ads | Reichweite, Lead-Kosten, Creatives | not yet connected | → offen | — |
| 10 | Monitor | Matomo | Traffic, Conversions (Privacy-first) | not yet connected | → offen (aufsetzen) | — |
| 11 | Local | Google Business Profile (GBP) | Local-SEO, NAP, Bewertungen | not yet connected | → offen | — |

**Mechanism-Optionen:** `mcp` (MCP-Server), `script` (Python/Node/Bash gegen eine API, in `scripts/`), `export` (CSV/JSON-Dump), `key+ref` (`.env`-Key + `references/{tool}-api.md`), `not yet connected`.

## Tracking-Default dieses Setups

**Matomo** (Web-Analytics, privacy-first) + **Google-Ads-Conversion-Tracking** (auf die primäre Conversion) + **Meta Pixel** (Retargeting). **Kein GA4** — datenschutzfreundlicher und genauer fürs Ads-Tracking. Alles consent-gesteuert (CMP). Build-Stack: **Astro + Tailwind**, statisches Hosting. Siehe `decisions/log.md`.

## Build-Stack-Default

Astro + Tailwind, design-system-basiert, ausgeliefert über Git (statisch). Visual-Pipeline: Gemini Imagen 4 für Stills, Higgsfield für Video/Cinematic/Audio/3D. Skill `generate-visuals`. Playbooks: `references/playbooks/image-generation.md`, `references/playbooks/video-generation.md`.

---

Beim Verbinden eines Monitors zusätzlich `references/{tool}-api.md` anlegen (Endpoints, Auth-Flow, häufige Queries — einmal recherchiert, für immer gespeichert).
