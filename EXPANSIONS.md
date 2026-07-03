# Expansions

Das Kit ist über den dünnen Start hinaus. Der gestaffelte Onboarding-Flow (`references/onboarding-flow.md`) läuft, dazu Bau, Visuals, Deploy und KVP. Hier steht, was schon drin ist und welche Ausbaustufen als Nächstes kommen.

## Schon drin (done)

- **Gestaffeltes Onboarding** — `onboard` (Phase 0/1) → `generate-questionnaire` (2) → `generate-content` (4+5) → Bau → `weekly-review` (7).
- **`build-page`** — eine Seite aus dem Design-System bauen (Copy + Seitentyp → Komponenten-Komposition, SEO-/Schema-getaggt, Commit).
- **`generate-visuals`** — Visuals je Slot: gecodete Infografik, Gemini-Bild (`scripts/generate-image.mjs`), Higgsfield-Video oder echtes Foto. Playbooks: `image-generation.md`, `video-generation.md`.
- **KVP (statt Auto-Sync)** — jeder Klon führt `OS-FEEDBACK.md` (Spuren Reibung + Learning). `os-review` clustert die offenen Einträge und legt Pascal eine Entscheidungs-Tabelle vor; Umsetzung nur nach Freigabe. Regeln: `references/os-improvement.md`.
- **Deploy-Playbook** — Hetzner-Webspace (Apache), GitHub Actions → `npm ci` + `astro build` → FTPS via `lftp`, `public/.htaccess` für Redirects/404/Caching (`references/playbooks/deployment.md`).
- **Git-Modell** — Klon = eigenständiges Client-Repo, direkt auf `main` committen, kein Upstream-Auto-Sync (`references/git-workflow.md`).
- **Build-Stack entschieden** — Astro + Tailwind, Default für jeden Klon.
- **Tracking entschieden** — Matomo + Google-Ads-Conversion + Meta Pixel, kein GA4.
- **Design-System** — Tokens + Kern-Komponenten als Basis für `build-page` (`references/playbooks/design-system-usage.md`).

## Nächste Skills

- **`seo-task`** — On-Page-Optimierung einer Unterseite (Title/Meta/H-Struktur/interne Links) auf Basis von GSC/Sistrix.
- **`content-task`** — Blog-/Ratgeber-/Landingpage-Content schreiben/optimieren in Brand Voice (Playbooks `blog-ratgeber.md`, `landingpage.md`).
- **`conversion-task`** — Conversion-Element ändern + A/B-Test vorbereiten (`conversion-optimization.md`).
- **`audit`** — technischer SEO-/Performance-Crawl, Lücken-Report.
- **`client-report`** — Kunden-Report im festen Rhythmus aus den Monitor-Daten (`reporting.md`).

## Monitore (Reihenfolge nach Sistrix)

1. **Google Search Console** — kostenlos, SEO-Kern. Skript oder MCP.
2. **Google Ads** — wenn Ads laufen. API/Export (auch für Conversion-Tracking).
3. **Meta Ads** — wenn Ads laufen. API/Export (Meta Pixel ist gesetzt).
4. **Matomo** — Privacy-first Traffic/Conversions (Tracking-Default).

Je Monitor: `references/{tool}-api.md` anlegen (Endpoints, Auth, häufige Queries).

## Automatisierung

- `weekly-review` per Cron/Schedule wöchentlich anstoßen, Ergebnis als Entwurf.
- Anomalie-Alerts bei KPI-Abweichungen.
- `os-review` im festen Rhythmus laufen lassen, damit offene `OS-FEEDBACK.md`-Einträge nicht liegen bleiben.
