---
name: onboard
description: Use on Day 1 of a Website-AIOS clone, or when someone says "set up this site", "onboard the website", "let's get started", or has just cloned the kit. Phase-0/1-Orchestrator des gestaffelten Onboardings — erfasst die Start-Inputs (Erstgespräch-Transcript Pflicht, Branche, Ist-URL optional), macht Deep-Research zur Branche, analysiert die Ist-Website und wertet das Transcript aus. Übergibt dann an generate-questionnaire. Idempotent — re-run nach neuen Inputs.
---

# Website-AIOS Onboarding — Phase 0 + 1

Der Einstieg in den gestaffelten Onboarding-Flow (`references/onboarding-flow.md`). Dieses Skill deckt **Phase 0 (Start-Inputs erfassen)** und **Phase 1 (Selbst-Recherche)** ab. Es verlangt vom Kunden nur das Minimum, erarbeitet sich den Rest selbst und übergibt am Ende an `generate-questionnaire` (Phase 2).

Prinzip: gestaffelt statt alles-auf-einmal. Schwere Inputs (CI, Recht, Zugänge) kommen erst beim Bau (Phase 6) — hier NICHT erfragen.

Eine Marke ≠ der Betreiber: Voice, Profil und Insights gehören der Kundenseite, nicht uns.

## Vorrang-Regel (immer)

`decisions/log.md` schlägt ältere Intake-/Copy-/Research-Docs. Triffst du auf veraltete Tool-Nennungen in irgendeinem Dokument (z. B. GA4, Calendly, alter Build-Stack), gilt der Stand aus `decisions/log.md` bzw. die festen OS-Defaults: Build = Astro + Tailwind, Tracking = Matomo + Google-Ads-Conversion + Meta Pixel (kein GA4), Visuals = generate-visuals. Überschreibe Veraltetes beim Schreiben, statt es zu wiederholen.

## Phase 0 — Start-Inputs erfassen

Verschaffe dir erst den Überblick, dann sammle das Minimum.

### Schritt 0.1 — Inventar
1. `intake/transcripts/` scannen — liegt schon ein Erstgespräch-Transcript?
2. `intake/research/` und `context/gespraechs-insights.md` prüfen — existieren schon Outputs? Dann **Re-Run** (siehe Idempotenz).
3. `decisions/log.md` lesen — was ist bereits entschieden?

### Schritt 0.2 — die drei Start-Inputs
Frage gezielt ab, was fehlt — eins nach dem anderen, kein Fragebogen:

1. **Erstgespräch-Transcript (Pflicht).** Roh-Mitschrift/Transkript des Erstgesprächs. Lege es nach `intake/transcripts/erstgespraech-{kunde}.md` ab (oder bestätige das vorhandene). **Gate:** Liegt kein Transcript vor → Stopp. Ohne Transcript keine Phase 1.
2. **Branche / Vertical (Pflicht).** Eine klare Branchenbezeichnung + Region (z. B. "Dachdecker, Raum Bremen"). Notieren.
3. **Ist-Website-URL (optional).** Falls vorhanden, notieren. Falls keine existiert: vermerken "keine Ist-Website".

Mehr wird in Phase 0 NICHT verlangt. Keine CI, kein Recht, keine Zugänge.

**Gate Phase 0:** Transcript liegt vor + Branche bekannt → weiter zu Phase 1.

### Schritt 0.3 — Abkürzungs-Pfad prüfen (sanktioniert)
Liegt bereits reiches Vormaterial vor — ausgefüllter Fragenkatalog, Deep Research, Unternehmensprofil, Sitemap — dann **Phase 2 (`generate-questionnaire`) und Phase 3 überspringen**. Vorgehen:
1. Vorhandenes Material sichten und **ingestieren** (nicht neu recherchieren, was schon beantwortet ist).
2. Die **Phase-0/1-Outputs erzeugen** (`branchen-report.md`, ggf. `ist-website-analyse.md`, `gespraechs-insights.md`) aus dem Vormaterial — nur die Lücken selbst schließen.
3. **Direkt zu `generate-content`** übergeben (Fragebogen entfällt, da bereits beantwortet).

**Idempotenz:** Was das Vormaterial schon liefert, NICHT neu generieren. Übernehmen, was da ist; nur ergänzen, was fehlt.

## Phase 1 — Selbst-Recherche (OS arbeitet, Kunde wartet)

Drei Arbeitsstränge. Lege fehlende Ordner an. Schreibe konkret und knapp. Wo Daten fehlen: `→ offen: …` notieren statt erfinden. Verbatim-Zitate aus dem Transcript als Voice-/Schmerz-Anker markieren.

### Schritt 1.1 — Deep Research → Branchen-Report
Rufe das **`deep-research`**-Skill auf. Forschungsfrage: konversionsstarke digitale Positionierung für **{Branche} in {Region}**. Abzudecken:
- Markt + Nachfrage (Suchverhalten, saisonale Muster, lokale Besonderheiten)
- Wettbewerb (typische Anbieter, deren Website-/Positionierungs-Muster, Lücken)
- Kundenpsychologie (Trigger, Einwände, Entscheidungskriterien dieser Zielgruppe)
- Conversion-Hebel + Trust-Signale, die in dieser Branche ziehen
- SEO/GEO-Winkel (Keyword-Themen, lokale Intent-Muster)

**Output:** `intake/research/branchen-report.md` (zitiert, mit Quellen).

### Schritt 1.2 — Ist-Website-Analyse (nur falls URL)
Falls eine Ist-URL vorliegt: crawlen/auswerten und festhalten:
- Stärken/Schwächen (Inhalt, Struktur, Conversion, Trust)
- migrierbare Inhalte (Texte, Referenzen, Bilder, NAP/Öffnungszeiten)
- technischer Stand (Stack, Performance, mobile, Tracking-Reste)
- erste SEO-Beobachtungen (Rankings/Sichtbarkeit, falls greifbar)

**Output:** `intake/research/ist-website-analyse.md`.
Keine URL → diesen Schritt überspringen und in der Übergabe vermerken.

### Schritt 1.3 — Transcript-Auswertung → Insights
Werte das Transcript aus und destilliere nach `context/gespraechs-insights.md`:
- **Ziele** des Kunden (was die Seite leisten soll)
- **Schmerzen / Status quo** (was heute nicht funktioniert)
- **Wunschkunde** (wen er will / wen nicht)
- **Einwände / Bedenken** (auch implizite)
- **Voice-Anker (verbatim)** — wörtliche Zitate, wie der Kunde spricht
- **offene Fragen** — was das Transcript NICHT klärt (Futter für Phase 2)

Nichts erfinden. Was unklar ist, kommt als offene Frage in den Fragebogen.

## Übergabe an Phase 2

Wenn die drei Outputs stehen, übergib an **`generate-questionnaire`** (Phase 2). Dieses Skill baut aus Research + Insights einen kunden-spezifischen Fragebogen, der nur fragt, was noch offen ist.

Melde am Ende in dieser Form:

```
✓ Phase 0 + 1 fertig.
Inputs:   Transcript [✓], Branche {…}, Ist-URL [vorhanden/keine].
Research: intake/research/branchen-report.md
          intake/research/ist-website-analyse.md [oder: keine URL — übersprungen]
Insights: context/gespraechs-insights.md
Offen:    {2–4 wichtigste offene Fragen aus den Insights}

Nächster Schritt: /generate-questionnaire — maßgeschneiderten Fragebogen aus Research + Insights bauen und an den Kunden schicken (Phase 2).
```

## Idempotenz / Re-Run

Existieren schon Dateien in `intake/research/` oder `context/gespraechs-insights.md`:
- bei neuem/aktualisiertem Transcript oder neuer URL: Alt-Stand nach `archives/onboard-{YYYY-MM-DD-HHMM}/` kopieren (nicht löschen), dann neu schreiben.
- sonst: nur die fehlenden/leeren Outputs ergänzen, vorhandene nicht überschreiben.

## Regeln
1. Transcript ist Pflicht — ohne Transcript kein Phase-1-Start (Gate).
2. In Phase 0/1 NUR Transcript + Branche (+ optionale URL) erfragen. CI/Recht/Zugänge erst in Phase 6.
3. `decisions/log.md` schlägt ältere Docs — veraltete Tool-Nennungen beim Schreiben überschreiben (OS-Defaults: Astro+Tailwind, Matomo+Google-Ads+Meta Pixel, kein GA4).
4. Deep Research über das `deep-research`-Skill, nicht ad hoc.
5. Nichts erfinden — Lücken als `→ offen` / offene Frage markieren; verbatim Voice-Anker bewahren.
6. Insights & Voice der Seite ≠ Profil/Stimme des Betreibers.
7. Idempotent — Re-Run refresht bei neuen Inputs, Backup nach `archives/onboard-{Datum}/`.
8. Am Ende an `generate-questionnaire` übergeben — hier endet Phase 1. (Ausnahme: sanktionierter Abkürzungs-Pfad aus Schritt 0.3 → direkt an `generate-content`.)

## KVP-Check (am Ende)
Augen offen: Ist beim Onboarding etwas schiefgelaufen/unklar gewesen (**Reibung**) oder hast du eine Qualitäts-/Prozess-Erkenntnis gewonnen, die das OS besser macht (**Learning**)? Dann sofort in `OS-FEEDBACK.md` loggen (Format siehe Datei). Nichts wandert automatisch ins Quell-OS — Verbesserungen kommen nur über das gemeinsame Review + Freigabe durch Pascal.
