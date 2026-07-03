---
name: generate-visuals
description: Use to create visuals for a page — images, infographics or video — or on "bild generieren", "video erstellen", "visuals fuer die seite", "hero-video", "motion-hero", "bild fuer den hero". Decides per slot which tool fits (coded infographic, Gemini image, Higgsfield video, or requested real photo), generates, optimizes and verifies performance. Replaces the old image-only flow.
---

# Generate Visuals — Infografik, KI-Bild, Video & Foto

Erzeugt **alle Visuals** einer Seite — vom statischen Bild über die gecodete Infografik bis zum Bewegtbild/Hero-Video. Vereint die beiden Playbooks `references/playbooks/image-generation.md` (Bild/Infografik/Foto) und `references/playbooks/video-generation.md` (Video/Cinematic/Audio/3D). Pro Slot wird das passende Werkzeug gewählt, das Asset finalisiert, optimiert und gegen Performance geprüft. Nichts wird geraten — fehlt ein Pflicht-Input (CI, Slot-Bedarf, echtes Material), erst nachfragen oder anfordern.

Ersetzt den alten, toten `generate-images`-Flow: dieses Skill deckt Bild **und** Video ab.

## Vier Werkzeuge — klar getrennt

| Bedarf | Werkzeug | Mechanismus |
|---|---|---|
| Abstraktes Konzept (Ablauf, Vergleich, Zahl, System, Daten/Text) | **Gecodete Infografik** (SVG/HTML aus Design-Tokens), Vorbild `HeroVisual.astro` | im Code, kein externes Tool |
| Stand-/Atmosphärenbild, generische Szene, generische Menschen (Emotion) | **Gemini Imagen 4** | `node scripts/generate-image.mjs` (`GEMINI_API_KEY` in `.env`) |
| Cinematic / Bewegtbild / Hero-Video / Audio / 3D | **Higgsfield** | MCP (`.mcp.json`) |
| Spezifische reale Identität (Inhaber:in, Team, echtes Projekt, Beweis/Zertifikat) | **Echtes Foto/Video — anfordern** | nie generieren |

**Harte Regel:** Echte, benannte Personen oder echte Projekte werden NIE generiert (E-E-A-T, Ehrlichkeit, Recht am eigenen Bild). Fehlt echtes Material → beim Kunden anfordern und als offenen Punkt im Build-Log vermerken.

## Input (vor dem Start prüfen)

- **CI** — `context/brand-profile.md` (Farben als Hex, Bildsprache, Stimmung, Do/Don'ts). Pflicht, kein Visual ohne CI-Abgleich.
- **Slot-Bedarf** — welche Seite, welche Slots. Aus `references/playbooks/page-structure.md` ableiten (Hero, Leistungs-Teaser, Über-uns, Standort, Trust-Sektion).
- **Echtes Material** — Ordner `assets/images/` (und ggf. Kunden-Video) prüfen: liegt Inhaber-/Team-/Projekt-Material vor?

Fehlt CI oder Slot-Bedarf → erst klären. Schlechter Input = inkonsistente Visuals.

## Schritte

### 1. CI laden — `context/brand-profile.md`
- Primär-/Sekundärfarben (Hex), Bildsprache, Stimmung, erlaubte Motive, Do/Don'ts lesen.
- 3–5 Stil-Anker notieren (gelten für Bild **und** Video, damit eine Seite konsistent wirkt: gleiche Lichtstimmung, Farbtemperatur, Perspektive).

### 2. Slot-Bedarf bestimmen — `references/playbooks/page-structure.md`
- Pro Seitentyp die Visual-Slots und ihre Funktion ablesen.
- Je Slot festhalten: statisch oder bewegt? Erklärt es ein abstraktes Konzept? Zeigt es eine reale Identität?

### 3. Pro Slot das Werkzeug wählen — Entscheidungsbaum
```
Zeigt der Slot eine SPEZIFISCHE reale Identität
(Inhaber:in/Team, namentliche:r Kunde:in, echtes Projekt, Beweis/Zertifikat)?
  JA  -> ECHTES FOTO/VIDEO. Liegt keins vor -> anfordern, Build-Log. NIE generieren.
  NEIN ->
    Erklärt es ein abstraktes Konzept (Ablauf, Ergebnis, Vergleich, Zahl, Daten/Text)?
      JA  -> GECODETE INFOGRAFIK (SVG/HTML aus Tokens). Vorbild HeroVisual.astro.
      NEIN ->
        Braucht der Slot Bewegung (Motion-/Hero-Video, Cinematic, Kamerafahrt)?
          JA  -> VIDEO via Higgsfield (MCP). Siehe video-generation.md.
          NEIN -> KI-BILD via Gemini (scripts/generate-image.mjs). Siehe image-generation.md.
```

### 4. Erzeugen — nach Playbook
- **Infografik:** im Code aus Design-Tokens bauen (keine Roh-Hex/-px), barrierefrei (`role="img"` + `<title>/<desc>`). Vorbild `src/components/HeroVisual.astro`.
- **KI-Bild — `image-generation.md`:** CI-Prompt + Negativ-Prompt + Stil-Anker. `node scripts/generate-image.mjs --prompt "<CI-Prompt>" --out public/images/<name>.png --aspect 16:9`. 3–4 Varianten, beste wählen. Konsistenz-Check aller Bilder einer Seite.
- **Video — `video-generation.md`:** Higgsfield via MCP. CI-Stil-Anker + Stimmung in den Prompt, Länge/Loop und Kamerabewegung dezent halten. Generische Szenen/Atmosphäre, keine realen Identitäten.

### 5. Optimieren
- **Bild:** nach WebP (Q80 Fotos / Q90 Grafik mit harten Kanten), responsive Breiten 480/768/1200/1920 + `srcset`/`<picture>`. Ziel: Hero < 200 KB, Inline < 100 KB, Thumb < 40 KB. Hero `fetchpriority="high"`, Rest `loading="lazy"`. Vorlagen (cwebp/ImageMagick/Markup) in `image-generation.md`.
- **Video:** web-taugliches Format (MP4/H.264 + WebM, ggf. AV1), Poster-Bild als sofort sichtbarer LCP-Frame, `preload="metadata"`, autoplay nur `muted`+`playsinline`+`loop` ohne Ton. `prefers-reduced-motion: reduce` respektieren — dann Poster/Standbild statt Autoplay. Details in `video-generation.md`.

### 6. Alt-Text / Quellen / Lizenz
- Sprechende Dateinamen (kebab-case, Keyword). Alt-Text für jedes Bild (beschreibend, kein Stuffing; leer `alt=""` bei reiner Deko). Video: sinnvolles `title`/Beschriftung, ggf. Captions.
- Quelle/Lizenz je Asset notieren (Kunde / generiert / Stock + Lizenz-ID). KI-Assets kennzeichnen, wo nötig. Strittige Fälle in `decisions/log.md`.

### 7. Performance verifizieren — `references/playbooks/performance-a11y.md`
- Nach Einbau messen (Lighthouse/PageSpeed): LCP < 2,5 s, kein Asset blockiert den Hauptthread, kein Layout-Shift (feste `width`/`height` bzw. `aspect-ratio`). Video darf den LCP nicht verschlechtern (Poster zählt).
- Bei Verstoß zurück zu Schritt 5.

### 8. KVP-Check — Learning festhalten
- Kurz reflektieren: Was ist bei den Visuals aufgefallen, das `references/playbooks/image-generation.md` / `references/playbooks/video-generation.md` schärfen würde (z.B. Bild-Benennung, Prompt-Muster, Format)?
- Erkenntnis sofort in `OS-FEEDBACK.md` als **Learning** loggen (Format: Beobachtung / Betrifft / Verbesserung / Status). Nicht nur Fehler — jede Qualitäts- oder Prozess-Erkenntnis.

## Output

Alle Visual-Slots der Seite final befüllt — Infografiken im Code, KI-Bilder als optimierte WebP-Sets, Videos web-tauglich mit Poster und reduced-motion-Fallback, echtes Material angefordert wo nötig. Alt-Texte gesetzt, Lizenzen dokumentiert, Performance geprüft.

## Bezug

- Playbooks: `references/playbooks/image-generation.md` (Bild/Infografik/Foto), `references/playbooks/video-generation.md` (Video/Cinematic/Audio/3D), `references/playbooks/performance-a11y.md` (LCP/CWV).
- Werkzeuge: Gemini Imagen 4 via `scripts/generate-image.mjs` (`GEMINI_API_KEY` in `.env`); Higgsfield via MCP (`.mcp.json`); Infografiken im Code (`HeroVisual.astro`). Stand & Auth in `connections.md`.
- Kontext: `context/brand-profile.md` (CI/Bildsprache), `references/playbooks/page-structure.md` (Slots je Seitentyp), Kunden-Input `assets/images/`.
- Workflow: `build-page`, Schritt „Bilder/Visuals" zwischen SEO und Komposition.
