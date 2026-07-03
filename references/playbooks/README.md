# Playbooks — Index

Skills und Workflows nutzen diese Playbooks als Wissensbasis: Statt Regeln neu zu erfinden, lädt die KI das passende Playbook und arbeitet danach. Jedes Playbook beschreibt Prinzipien und Vorgehen für einen Aufgabentyp.

## Content

- `copywriting.md` — Seitentexte in Brand Voice schreiben, die Nutzen zeigen und zu einem nächsten Schritt führen.
- `page-structure.md` — Sektionen, Reihenfolge und Aufgabe je Seitentyp als Bauplan für Kundenseiten.
- `blog-ratgeber.md` — Aus einem Keyword einen suchintention-treffenden Ratgeber im Topic-Cluster bauen.
- `landingpage.md` — Conversion-fokussierte 1-Ziel-Seiten passend zur schaltenden Anzeige.

## SEO/GEO

- `seo-onpage.md` — Seiten so strukturieren und auszeichnen, dass sie für priorisierte Keywords ranken.
- `geo.md` — Seiten so bauen, dass KI-Antwortmaschinen sie zitieren und den Dienstleister nennen.
- `local-seo.md` — Lokalen Dienstleister im Local Pack und organisch bei standortbezogenen Suchen oben platzieren.
- `schema-structured-data.md` — Korrektes JSON-LD-Markup je Seitentyp für Rich Results.

## Conversion

- `conversion-tracking.md` — Jede Lead-Aktion DSGVO-konform in Matomo und Google Ads erfassen.
- `conversion-optimization.md` — Aus vorhandenem Traffic per Test-Loop messbar mehr Anfragen holen.

## Bild/Video/Design

- `image-generation.md` — Konsistente, schnelle, rechtssichere Stills (Gemini Imagen 4 via `scripts/generate-image.mjs`); echte Fotos wo Vertrauen zählt, generierte nur als Lückenfüller.
- `video-generation.md` — Sparsam eingesetztes, CI-konformes Bewegtbild (Higgsfield via MCP): Motion-Hero, B-Roll. Performance zuerst; im Zweifel kein Video.
- `design-system-usage.md` — Seiten aus vorhandenen Komponenten und Tokens des Design-Systems zusammenbauen.

Entscheidungs-Reihenfolge je Slot: Text/Infografik → Standbild → Video. Beide Generatoren steuert die `generate-visuals`-Skill.

## Betrieb

- `reporting.md` — Kunden im festen Rhythmus mit ergebnisorientiertem, kommentiertem Report versorgen.
- `performance-a11y.md` — Schnelle Ladezeit auf dem Handy und Bedienbarkeit für alle sicherstellen.
- `deployment.md` — Astro-Seite via GitHub Actions (`npm ci` + `astro build`) per FTPS auf Hetzner-Webspace (Apache) deployen; `.htaccess` für Redirects/404/Caching.
