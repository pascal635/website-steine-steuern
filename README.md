# Website-AIOS

Ein eigenständiges, klonbares Betriebssystem für eine Website. Es baut die Seite und lässt sie danach **laufend wachsen** — SEO, Content, Conversion und Überwachung in einem geschlossenen Kreislauf, gesteuert allein über das wöchentliche Gespräch mit dem AIOS.

Gebaut nach demselben Muster wie ein persönliches AIOS: **Repo klonen → `/onboard` → läuft.** Ein Klon pro Website. Erste Instanz: die LIKOVO-Seite. Danach jede Kundenseite.

## Der Kreislauf

```
   ┌──────────────────────────────────────────────────────┐
   │                                                        ▼
1 · Bauen  →  2 · Messen  →  3 · Entscheiden  →  4 · Umsetzen
(Git +        (Daten         (Wöchentliches      (Tasks über
Design-       einsammeln)     Review = Herz)      das AIOS)
System)            ▲
                   │
            Monitoring: GSC · Sistrix · Ads · Meta
```

Phase 3 — das wöchentliche Review — ist das Herz: Du schaust mit dem AIOS auf die Daten und entscheidest die nächsten Tasks. Alle Änderungen an der Seite laufen ausschließlich darüber.

## So startest du

Das Onboarding läuft **gestaffelt** in 7 Phasen — Inputs werden erst verlangt, wenn sie gebraucht werden. Verbindlicher Ablauf: `references/onboarding-flow.md`.

1. Repo klonen.
2. `/onboard` (Phase 0/1) — Start-Inputs erfassen: **Erstgespräch-Transcript** (Pflicht), Branche, alte URL (optional). Dann Deep Research zur Branche, Ist-Website-Analyse, Transcript-Auswertung.
3. `/generate-questionnaire` (Phase 2) — erzeugt den kunden-spezifischen Fragebogen an den Kunden.
4. `/generate-content` (Phase 4+5) — schreibt Strategie, Seitenstruktur und Texte, fährt die Freigabe-Schleife bis zum OK.
5. `/build-page` + `/generate-visuals` (Phase 6) — Seiten aus dem Design-System bauen, Visuals erzeugen. Build-Stack: **Astro + Tailwind**. Tracking: **Matomo + Google-Ads-Conversion + Meta Pixel** (kein GA4).
6. `/weekly-review` (Phase 7) wöchentlich — zieht die verbundenen Daten, fasst zusammen, schlägt priorisierte Tasks vor. Loop bis zum ersten Lead = die erste Fallstudie.

**Verbesserung des OS (KVP statt Auto-Sync):** Kein automatischer Klon-Sync. Jeder Klon ist ein eigenständiges Client-Repo und führt ein `OS-FEEDBACK.md` — zwei Spuren: **Reibung** (was schieflief/unklar war) und **Learning** (was besser funktioniert, z.B. Bild-Benennung, Seitenaufbau, Textführung). Erkenntnisse sofort loggen, nicht nur Fehler. Verbesserungen wandern nur nach gemeinsamer Analyse und Freigabe durch Pascal ins Quell-OS. Ritual: `/os-review`. Regeln: `references/os-improvement.md`.

## Wo was liegt

- `website-intake.md` — Source-of-Truth-Fragebogen, von `/onboard` gelesen.
- `context/` — über die Seite, Brand Voice, Ziele (von `/onboard` gefüllt).
- `references/` — Architektur, Design-System-Doku, API-Guides je Monitor.
- `connections.md` — Registry der Datenquellen + Git + Hosting.
- `decisions/log.md` — was wann warum an der Seite geändert wurde.
- `OS-FEEDBACK.md` — KVP-Log dieses Klons (Reibung + Learning), Input für `/os-review`.
- `.claude/skills/` — `onboard`, `generate-questionnaire`, `generate-content`, `build-page`, `generate-visuals`, `weekly-review`, `os-review` (weitere Ausbaustufen via `EXPANSIONS.md`).

**Deploy:** Hetzner-Webspace (Apache), GitHub Actions → `npm ci` + `astro build` → FTPS-Upload via `lftp`, `public/.htaccess` für 301-Redirects/404/Caching. Ablauf: `references/playbooks/deployment.md`. Git-Modell: `references/git-workflow.md`.

Vollständige Architektur: `references/website-aios-architektur.md`.
