---
name: build-page
description: Use to build ONE page from the Website-AIOS design system, or on "baue die Leistungsseite", "neue City-Page für X", "erstell die Startseite", "build the contact page". Takes a page type + a copy source/briefing and produces a committed, design-system-conform, SEO- and schema-tagged page. One run = one shipped page.
---

# Build Page — eine Seite aus dem Baukasten

Baut **genau eine** Seite des Kunden-Setups: vom Seitentyp über Copy, On-Page-SEO, Schema und Visuals bis zur fertig komponierten, committeten Seite. Arbeitet woertlich nach den Playbooks unter `references/playbooks/` und dem Baukasten in `references/design-system.md`. Nichts wird geraten — fehlt ein Pflicht-Input, erst nachfragen.

Voice ist Pflicht-Kontext: `references/voice.md` bzw. `context/voice.md` vor dem ersten Wort laden. Tracking-Default des Setups: Matomo + Google-Ads-Conversion + Meta Pixel (kein Google Analytics / GA4). SEO-Datenquelle: Sistrix (MCP).

## Input (vor dem Start prüfen)

- **Seitentyp** — einer aus `page-structure.md` (Startseite, Leistungsseite, Landingpage, Über uns, Kontakt, Standort-/City-Page, Ratgeber/Blog, FAQ).
- **Copy-Quelle / Briefing** — Roh-Copy, Angebot, bestehender Text oder ein Briefing mit: Ziel der Seite, Zielgruppe, primärer CTA/Conversion-Definition (Formular/Anruf/WhatsApp/Buchung), Primary Keyword (bei SEO-Seiten), bei City-Pages der Ort, Do/Don'ts.

Fehlt Seitentyp oder eine Pflicht-Angabe im Briefing → erst ergänzen lassen. Schlechtes Briefing = schlechte Seite.

## Schritte

### 1. Seitenaufbau wählen — `references/playbooks/page-structure.md`
- Passende Anatomie für den Seitentyp aus dem Playbook übernehmen: Sektionen **und** ihre Reihenfolge. Keine Sektion auslassen, keine Reihenfolge tauschen ohne Grund.
- Ziel der Seite + genau **einen** primären CTA festlegen.
- H1 (genau eine), H2/H3-Gerüst nach der Sektions-Hierarchie anlegen.
- Bei City-Page: Ort gehört in H1, URL und Meta; mind. 60% Unique Content einplanen.

### 2. Copy schreiben — `references/playbooks/copywriting.md`
- Voice laden (`references/voice.md` / `context/voice.md`) und im Prompt halten.
- Framework wählen: PAS (Schmerzpunkt-Seiten, Landingpage) oder AIDA (Leistungs-/Verkaufsseiten).
- 3 Headline-Varianten, beste wählen. Jeden Feature-Satz in einen Nutzen übersetzen.
- Du-Ansprache, kurze Sätze, keine Em-Dashes, Bullets vor Absätzen, Zahlen statt Adjektive.
- CTA direkt und handlungsstark, mind. zweimal (Hero + Ende); Reibung-Reducer darunter.
- **GEO-Quick-Answer:** In den ersten ~200 Wörtern einen 40–80-Wort-Definition-Lead platzieren (sachlich, zitierfähig); konversationelle H2 als echte Nutzerfragen mit Antwort-zuerst (siehe `copywriting.md` + `geo.md`).

### 3. On-Page-SEO + Schema — `references/playbooks/seo-onpage.md` und `references/playbooks/schema-structured-data.md`
- Primary Keyword aus dem Mapping zuweisen (eine Seite = ein Keyword). Bei Bedarf Recherche/Validierung über Sistrix-MCP (`keyword_seo`, `keyword_seo_metrics`, `keyword_seo_searchintent`, `keyword_seo_serpfeatures`).
- URL, Title (≤ 60 Zeichen), Meta-Description (≤ 160 Zeichen mit CTA) nach `seo-onpage.md`. Keyword in H1 + erste 100 Wörter, Dichte < 2%. Interne Verlinkung rein und raus.
- Schema-Set je Seitentyp aus dem Mapping in `schema-structured-data.md` setzen (LocalBusiness-Subtyp je ICP / Service / FAQPage / Article / BreadcrumbList). NAP zeichengenau aus `context/` bzw. `connections.md`. JSON-LD aus den Vorlagen befüllen, nur Sichtbares markieren.

### 4. Visuals — Bild + Bewegtbild — `references/playbooks/image-generation.md`, `references/playbooks/video-generation.md`, Skill `generate-visuals`
- Visual-Slots aus der Anatomie ableiten. Pro Slot Entscheidungsbaum: **Infografik (coden) vs. KI-Bild vs. KI-Video / Bewegtbild vs. echtes Foto/Video**.
- **Infografik-First:** abstrakte Konzepte (Ablauf, Ergebnis, Vergleich, Zahl, System) als gecodete SVG/HTML-Infografik aus Tokens lösen — scharf, leicht, barrierefrei, markenkonform. Wo eine Infografik Kunden gewinnt, hat sie Vorrang vor Deko-Bildern und Deko-Video.
- **Stills (KI-Bild):** über Skill `generate-visuals` nach `references/playbooks/image-generation.md` (Imagen-Script `scripts/generate-image.mjs`). KI-Bilder nur für Atmosphäre/Konzept ohne Personen-Identität.
- **Bewegtbild (Video):** Video-Slots zusätzlich zu Bild-Slots prüfen und über Skill `generate-visuals` nach `references/playbooks/video-generation.md` (Higgsfield via MCP) produzieren:
  - **Motion-Hero** — kurzer, geloopter Atmosphäre-/Kontext-Clip im Hero statt oder hinter dem Still; nur wenn er Conversion stützt, nicht als Deko.
  - **B-Roll** — kurze Konzept-/Prozess-Clips zwischen Sektionen, um Ablauf/Ergebnis/System zu zeigen.
  - Video performant + barrierefrei einbinden: kurz und komprimiert, `muted` + `playsinline` + `loop`, `autoplay` nur dezent, Poster-Frame als WebP-Still, `preload="none"` außerhalb des Heros, `prefers-reduced-motion` respektieren (Bewegung aussetzen, statisches Poster zeigen).
- Echte Person/Team/Standort/Projekt **nie generieren** (E-E-A-T) — gilt für Bild **und** Bewegtbild; fehlt es, beim Kunden anfordern und im Build-Log vermerken.
- Alle Bitmaps als WebP, responsive Varianten (480/768/1200/1920) + srcset, sprechende Dateinamen, Alt-Text für jedes Bild. Hero-Still `fetchpriority="high"`, Rest `loading="lazy"`. Videos mit sprechenden Dateinamen + Poster, außerhalb des Heros lazy.

### 5. Komposition aus dem Baukasten — `references/design-system.md`
- Seite **nur** aus den Kern-Komponenten stapeln (Header → Sektionen → Footer) gemäß der Kompositions-Tabelle für den Seitentyp. Keine neue Komponente ohne Dokumentation in der Datei.
- Nur Tokens (keine Roh-Hex/-px/-Schriftnamen). Mobile-first, eine H1, Sektionen wechseln `--color-bg` / `--color-bg-subtle`.
- Tracking-Hooks Pflicht: `data-track="lead"` auf Formular-Submit, `tel:`-Klick, WhatsApp, Buchungs-Button (Matomo + Google-Ads-Conversion + Meta Pixel, kein GA). DSGVO-Consent am Formular, Karten/Drittinhalte erst nach Consent.
- Gegen die Checklisten aus `page-structure.md`, `seo-onpage.md` und §4 `design-system.md` prüfen (5-Sekunden-Hero-Test, Kontrast AA, Touch ≥44px, LCP < 2,5 s).

### 6. Abnahme-Gate (Pflicht — Seite gilt erst dann als fertig)
Die Seite wird gegen **alle fünf Dimensionen** geprüft. Jeder Punkt muss sitzen, sonst zurück in den jeweiligen Schritt. Das ist der Korrektur-Killer.

**A — Struktur & CRO** (`page-structure.md`, `conversion-optimization.md`)
- [ ] Genau **eine H1**; Sektionen H2/H3 lückenlos; Anatomie des Seitentyps vollständig
- [ ] Genau **ein primärer CTA-Typ**; CTA mind. 2× (Hero + Ende); Reibung-Reducer darunter
- [ ] Max. 3–4 Optionen je Auswahlblock (kein Choice Overload); Beweis (Zahlen/Testimonials) früh
- [ ] 5-Sekunden-Hero-Test bestanden (was, für wen, nächster Schritt)

**B — Copy & Voice** (`copywriting.md`, `context/voice.md`)
- [ ] Du-Ansprache, kurze Sätze, keine Em-Dashes, Nutzen statt Feature; keine verbotenen Wörter
- [ ] GEO-Quick-Answer (40–80 W., Definition-Lead) in den ersten ~200 Wörtern; konversationelle H2

**C — SEO & GEO** (`seo-onpage.md`, `geo.md`)
- [ ] Primary Keyword in H1 + erste 100 W. (Dichte < 2 %); Title ≤ 60, Meta-Desc ≤ 160 mit CTA
- [ ] Interne Verlinkung rein + raus; mind. 1 Fakten-Block; sichtbares „Stand: {Monat Jahr}"
- [ ] Entität wortgleich zu `context/`; KI-Bots in `robots.txt` zugelassen; `llms.txt` aktuell

**D — Schema** (`schema-structured-data.md`)
- [ ] Gestapeltes JSON-LD `@graph` (Organization/WebSite via `@id`), Seitentyp-Schema (Service/FAQPage/Article/LocalBusiness/BreadcrumbList) gesetzt; nur Sichtbares markiert; NAP zeichengenau

**E — A11y & Performance** (`performance-a11y.md`)
- [ ] Kontrast ≥ 4,5:1 (Text) / 3:1 (groß+UI); sichtbarer Fokus-Ring; Tastatur komplett bedienbar
- [ ] Touch-Ziele ≥ 44×44px; Bilder/Videos mit `width/height`; Alt-Texte (Deko `alt=""`)
- [ ] Bewegtbild: `prefers-reduced-motion` respektiert; Poster-Frame gesetzt; außerhalb Hero `preload="none"`; `muted` + `playsinline`
- [ ] Formular: `<label for>`/`id`, `autocomplete`-Tokens, Honeypot statt Captcha, Fehler via `aria-describedby`
- [ ] LCP < 2,5 s · CLS < 0,1 · INP < 200 ms (mobil); WebP, Hero `fetchpriority`, Rest `lazy`
- [ ] In der Vorschau (Preview-MCP) auf **Desktop + Mobile** sichtgeprüft

### 7. Commit — Git
- Geänderte/neue Dateien **direkt auf `main` des Client-Repos** committen (Solo-Client-Repo, kein Branch-Zwang; `origin` = Client-Repo, Deploy läuft daraus). Details in `references/git-workflow.md` und `references/playbooks/deployment.md`.
- Conventional Commits, aussagekräftige Message, z. B. `feat(page): Leistungsseite <Leistung> <Ort>`.
- Build-Log / offene Punkte (z. B. angeforderte echte Fotos/Videos) vermerken; strittige Entscheidungen in `decisions/log.md`.

### 8. KVP-Check — nach der Seite (Pflicht)
- Kurz zurückblicken: Was ist aufgefallen? **Reibung** (was schieflief oder unklar war) oder **Learning** (was besser funktioniert — Handwerks-/Qualitäts-Erkenntnis zu Bild-Benennung, Seitenaufbau, Textführung).
- Jede Erkenntnis **sofort** in `OS-FEEDBACK.md` eintragen (offene Augen, nicht nur Fehler). Dabei benennen, welches Playbook/welchen Skill es schärft (z. B. `image-generation.md`, `page-structure.md`, `build-page`).
- Übernahme ins Quell-OS passiert nur später über das KVP-Review mit Pascal — hier nur beobachten und loggen.

## Output

Eine fertig komponierte, design-system-konforme Seite (Markup + Assets inkl. Bild/Bewegtbild + JSON-LD), gegen die Playbook-Checklisten geprüft und committet — bereit für Review und Launch.

## Bezug

- Playbooks: `page-structure.md`, `copywriting.md`, `seo-onpage.md`, `schema-structured-data.md`, `image-generation.md`, `video-generation.md`
- Skill: `generate-visuals` (Stills via Imagen-Script, Bewegtbild/Cinematic/Audio/3D via Higgsfield-MCP)
- Baukasten: `references/design-system.md` (Tokens, Komponenten, Kompositions- + Konsistenzregeln)
- Kontext: `references/voice.md` / `context/voice.md`, `context/brand-profile.md`, `connections.md` (NAP)
- Daten/Tracking: Sistrix (MCP) für Keywords/Rankings; Matomo + Google-Ads-Conversion + Meta Pixel (kein GA)
- Kreislauf: Bauen-Phase. Gebaute Seiten werden via `/weekly-review` gemessen und priorisiert (Messen → Entscheiden → Umsetzen).
