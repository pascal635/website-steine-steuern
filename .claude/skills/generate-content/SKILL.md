---
name: generate-content
description: Use after the questionnaire is answered (Phase 4+5 of the onboarding flow), or on "schreib die Strategie und Texte", "Seitenstruktur erstellen", "Website-Texte generieren", "Freigabe-Schleife für die Texte". Turns questionnaire answers + branche report + gespräch insights into context/strategie.md, a sitemap and per-page copy, then runs the client text-approval loop until released. Hands off to new-site-build only after approval.
---

# Generate Content — Strategie, Struktur, Texte + Freigabe

Phase 4+5 aus `references/onboarding-flow.md`. Aus **Fragebogen-Antworten + Branchen-Report + Gesprächs-Insights** entsteht: eine Strategie, eine Seitenstruktur/Sitemap und fertige Texte je Seite. Danach läuft die **Text-Freigabe-Schleife** mit dem Kunden, bis er alles freigibt. Erst nach Freigabe geht es an `new-site-build` (Bauen).

Hier wird **noch nicht gebaut**. Kein Design-System, kein Markup, keine Bilder, kein Tracking. Output ist Text: Strategie + Sitemap in `context/`, Texte als Entwurf-Dokument an den Kunden.

Voice ist Pflicht-Kontext: `context/voice.md` (bzw. `references/voice.md`) vor dem ersten Wort laden. Die Voice gehört der Kundenseite, nicht dem Betreiber. Klingt ein Text nach generischer KI, ist er falsch.

## Input (vor dem Start prüfen — Gate Phase 3)

- **Fragebogen-Antworten** — in `intake/` (aus `generate-questionnaire`). Pflichtfelder abgedeckt: Leistungen, USP, Zielgruppe, Einzugsgebiet/NAP, Referenzen, Conversion-Definition, Öffnungszeiten.
- **Branchen-Report** — `intake/research/branchen-report.md` (aus Phase 1 Deep Research).
- **Ist-Website-Analyse** — `intake/research/ist-website-analyse.md` (falls alte URL vorhanden; migrierbare Inhalte).
- **Gesprächs-Insights** — `context/gespraechs-insights.md` (Ziele, Schmerzen, Wunschkunde, Einwände, Voice-Anker verbatim).
- **Voice** — `context/voice.md` bzw. `references/voice.md`.

Fehlt ein Pflichtfeld im Fragebogen → gezielt nachfassen (eins nach dem anderen), Antwort in `intake/` schreiben. Lücken nie erfinden — als `→ offen: …` notieren. Ohne Conversion-Definition + Einzugsgebiet keine Strategie.

## Phase 4 — Strategie, Struktur, Texte

### 1. Strategie destillieren → `context/strategie.md`
Aus Fragebogen + Branchen-Report + Insights eine knappe, entscheidungsreife Strategie schreiben (keine Essays, Bullets vor Absätzen):
- **Positionierung** — Was ist das Angebot, für wen, Abgrenzung zum Status quo / Wettbewerb (aus Branchen-Report). Eine kanonische Entitäts-Schreibweise festlegen (Firmenname, Rechtsform, Straße+Stadt, Hauptleistung) — wortgleich überall, Basis für GEO/NAP.
- **Conversion-Strategie** — das *eine* primäre Ziel der Seite + Conversion-Definition (Formular / Anruf / WhatsApp / Buchung). Pro Seite genau ein primärer CTA. Conversion-Tool nur nehmen, was der Kunde wirklich nutzt — keinen Default annehmen.
- **SEO-Winkel** — Primär-Keyword-Cluster (lokal + Leistung), Quick-Win-Kandidaten. Bei Bedarf über Sistrix-MCP validieren (`keyword_seo`, `keyword_seo_metrics`, `keyword_seo_searchintent`, `keyword_seo_serpfeatures`). Eine Seite = ein Keyword (Kannibalisierung vermeiden).
- **GEO-Winkel** — die 5-10 echten Kundenfragen (an ChatGPT/Perplexity), je Seite 3-8. Welche Fakten machen die Entität zitierbar.
- **Voice-Anker** — 3-5 verbatim-Sätze aus den Insights, an denen sich die Texte ausrichten.

### 2. Seitenstruktur / Sitemap → `context/sitemap.md` (nach `references/playbooks/page-structure.md`)
- Seitentypen je Bedarf ableiten: Startseite, Leistungsseite(n), Über uns, Kontakt, Standort-/City-Page(s), Landingpage(s), Ratgeber/FAQ.
- URL-Struktur (sprechend, Keyword bzw. Ort+Leistung) + interne Verlinkungslogik festlegen.
- Je Seite: Ziel, primärer CTA, zugewiesenes Primary Keyword, Sektions-Anatomie aus `page-structure.md` (Sektionen **und** Reihenfolge — nichts auslassen, nicht tauschen ohne Grund).
- Bei City-Pages: Ort gehört in H1/URL/Meta, mind. 60% Unique Content einplanen (Doorway-Page-Risiko).

### 3. Texte je Seite (nach `copywriting.md` + `seo-onpage.md` + `geo.md`)
Pro Seite, Sektion für Sektion entlang der Anatomie:
- **Copy** (`references/playbooks/copywriting.md`): Voice laden und im Prompt halten. Framework wählen — PAS (Schmerzpunkt-Seiten, Landingpage) oder AIDA (Leistungs-/Verkaufsseiten). 3 Headline-Varianten, beste wählen. Jeden Feature-Satz in einen Nutzen übersetzen. Du-Ansprache, kurze Sätze, keine Em-Dashes, Bullets vor Absätzen, Zahlen statt Adjektive. Beweis vor Behauptung (echte Referenzen/Zahlen aus dem Fragebogen — nichts halluzinieren). CTA direkt, mind. zweimal (Hero + Ende; lange Seiten auch mittig), Reibung-Reducer darunter. Genau eine H1.
- **On-Page-SEO** (`references/playbooks/seo-onpage.md`): Primary Keyword aus dem Mapping. Title (≤ 60 Zeichen), Meta-Description (≤ 160 Zeichen mit CTA), URL. Keyword natürlich in H1 + erste 100 Wörter, Dichte < 2%. Interne Verlinkung rein/raus.
- **GEO** (`references/playbooks/geo.md`): Frage-Blöcke (Frage als H2/H3, 40-60-Wort-Antwort direkt darunter, alleinstehend verständlich). Mind. ein Fakten-Block (Tabelle/Liste mit harten Daten) je Seite. NAP/Entität zeichengleich. Sichtbares „Stand: {Monat Jahr}". Hinweis auf Schema notieren (gesetzt wird es erst im Bau).
- **Quality-Review** gegen die Playbook-Checklisten, bevor etwas zum Kunden geht. KI produziert, Mensch entscheidet. Max. 1 KI-Iteration, dann manuell schärfen.

**Output Phase 4:** `context/strategie.md` + `context/sitemap.md` (final in `context/`), Texte als **Entwurf-Dokument** versioniert in `intake/texte/` (z. B. `texte-v1.md`, eine Datei pro Seite oder ein Sammeldokument) → an den Kunden zur Freigabe.

## Phase 5 — Text-Freigabe-Schleife

Iterativ, bis der Kunde zufrieden ist. Hier wird nicht gebaut.

1. **Entwurf rausgeben** — `intake/texte/texte-v1.md` an den Kunden, mit klarer Bitte um konkrete Korrekturen je Seite/Sektion.
2. **Korrekturen aufnehmen** — Feedback strukturiert sammeln (welche Seite, welche Sektion, was ändern). Unklares Feedback gezielt rückfragen.
3. **Überarbeiten** — Änderungen einarbeiten, Voice + Playbook-Checklisten halten. Fakten/Versprechen nur, wenn belegt.
4. **Versionieren** — neue Version als eigene Datei in `intake/texte/` (`texte-v2.md`, `texte-v3.md` …). Alte Versionen nicht überschreiben — Verlauf bleibt. Kurz notieren, was sich je Version geändert hat.
5. **Wiederholen** ab Schritt 1, bis Freigabe.

**Gate:** Texte vom Kunden **ausdrücklich freigegeben**. Freigabe + Datum + freigegebene Version in `decisions/log.md` festhalten. Erst dann Phase 6.

## Übergabe an den Bau (nach Freigabe)

- Freigegebene Texte sind ab jetzt die Quelle für `new-site-build` / `build-page`.
- Nächste Phase verlangt erst jetzt: CI-Manual, Logo, echte Bilder, Recht (Impressum/Datenschutz/AGB), Zugänge (Domain, Hosting, GSC, Google Ads, Matomo, GBP). Diese Inputs hier **nicht** vorab einsammeln.
- Build-Stack steht fest (Astro + Tailwind), Tracking-Default steht fest (Matomo + Google-Ads-Conversion + Meta Pixel, kein GA4). Schema, Bilder/Video und Tracking entstehen im Bau, nicht hier.

## Output

`context/strategie.md` + `context/sitemap.md` (final), versionierte Texte in `intake/texte/` mit dokumentierter Freigabe in `decisions/log.md` — bereit für `new-site-build`.

## Bezug

- Flow: `references/onboarding-flow.md` (Phase 4+5). Vorgänger `generate-questionnaire` (Phase 2-3), Nachfolger `new-site-build` (Phase 6).
- Playbooks: `page-structure.md` (Sitemap + Sektions-Anatomie), `copywriting.md` (Texte + Voice), `seo-onpage.md` (Keyword/Meta/H-Struktur), `geo.md` (Frage-/Fakten-Blöcke, Entität).
- Kontext: `context/voice.md` / `references/voice.md`, `context/gespraechs-insights.md`, `intake/research/branchen-report.md`, `intake/research/ist-website-analyse.md`, Fragebogen-Antworten in `intake/`.
- Daten: Sistrix (MCP) für Keyword-Validierung. Entscheidungen in `decisions/log.md`.

## KVP-Check (am Ende)

Bevor du abschließt: Was ist beim Schreiben von Strategie/Struktur/Texten aufgefallen, das `copywriting.md` / `page-structure.md` / `seo-onpage.md` / `geo.md` schärfen würde? → `OS-FEEDBACK.md` (Learning).
