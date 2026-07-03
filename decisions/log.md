# Decisions Log

Append-only record meaningful decisions an dieser Website. `/weekly-review` schreibt hier genehmigte Task-Entscheidungen rein. Manuell ergänzbar.

**Format pro Eintrag:**

```
## YYYY-MM-DD — Kurztitel

**Decision:** was entschieden wurde.

**Why:** Begründung, Constraints, was die Entscheidung ändern würde.

**Owner:** wer verantwortlich ist.
```

Terse halten. Das *Warum* festhalten, nicht nur das *Was*.

---

## 2026-06-23 — Tech-Stack der Build-Schicht: Astro

**Decision:** Die Build-Schicht des Website-AIOS wird mit **Astro** umgesetzt — statisch-first, Komponenten + Design-System, Styling via Tailwind mit Tokens aus dem CI, Content Collections für Leistungs-/City-/Ratgeber-Seiten, Tracking via Matomo + Google-Ads-Conversion (mit Consent), statisches Deployment auf Hetzner. Details in `references/tech-stack-empfehlung.md`.

**Why:** Astro liefert reines HTML mit minimalem JS → beste Core Web Vitals out of the box (direkter Local-SEO- und Conversion-Hebel für den ICP). Dateibasiert + Git-nativ → genau die Oberfläche, auf der Coding-Agents zuverlässig bauen und Änderungen diffbar sind (Herz der Architektur). Als Vorlage pro Kunde klonbar, simpel auf Hetzner zu hosten. Was die Entscheidung ändern würde: wenn Kunden-Selbstpflege im Browser zur harten Anforderung wird (→ Git-basiertes CMS wie Decap/Tina ergänzen) oder echte App-Logik/Login zum Standard wird (→ Next.js).

**Alternatives considered:** Next.js (mächtiger, aber Overkill für Content-Seiten, schlechtere CWV-Baseline, Node-Hosting aufwändiger, mehr Agent-Footguns). WordPress/CMS (nicht Git-nativ, DB-Zustand bricht das Kernprinzip, schlecht für Agent-Arbeit, höhere Betriebslast pro Klon).

**Owner:** Pascal.

## 2026-07-03 — Rechtstexte von der Hauptseite übernommen

**Decision:** Impressum und Datenschutzerklärung wurden 1:1 von https://steine-steuern.de/impressum/ bzw. /datenschutz/ übernommen (gleicher Betreiber: Jotavent UG (haftungsbeschränkt), Bremen). In der Datenschutzerklärung wurde nur die Domain an `friends.steine-steuern.de` angepasst. AGB bleiben Platzhalter (keine Quelle geliefert).

**Why:** Selber rechtlicher Betreiber, daher gelten dieselben Angaben. Auf Wunsch von Pascal.

**⚠️ Offene rechtliche Lücke (vor Ads/Tracking-Livegang schließen):** Die übernommene Datenschutzerklärung (Stand 12.02.2024) deckt die Besonderheiten DIESER LP NICHT ab: Lead-Formular über ActiveCampaign, geplantes Tracking (Matomo, Google-Ads-Conversion, Meta Pixel) und Hetzner-Hosting. Vor dem Schalten von Anzeigen bzw. Aktivierung des Trackings muss die Datenschutzerklärung um diese Punkte ergänzt werden (Auftragsverarbeiter, Cookies/Consent, Meta/Google Rechtsgrundlagen). Kontakt-Mail in der Quelle ist `info@jota-projekte.de` (abweichend von `info@steine-steuern.de` im Impressum) — von Pascal prüfen lassen.

**Owner:** Pascal.

## 2026-07-03 — Leadmagnet-Landingpage gebaut (Astro-Scaffold + Steuer-Playbook-LP)

**Decision:** Erste Seite des Klons ist die Leadmagnet-LP für das kostenlose Steuer-Playbook. Astro + Tailwind (v4) neu aufgesetzt, CI aus `assets/ci/` in `src/styles/global.css` auf die design-system-Token-Namen gemappt. Ein Conversion-Ziel: Formular-Ausfüllung. Alle CTAs (Gold-Button, CI-konform "nur primäre Buttons") scrollen auf **ein** Formular (`#playbook`).

**Why:** Stack war bereits entschieden (Astro), Kontext/Onboarding noch leer → CI direkt aus dem Manual extrahiert statt `/onboard` abzuwarten, um nicht zu blockieren. Abweichung von der Copy-Vorlage: der Standard-CTA-Block wird **einmal pro Sektion** gesetzt statt unter jedem Unterblock (Vorlage hätte 12+ CTAs ergeben → Choice-/Wiederholungs-Overload). FAQ-Sektion ergänzt (nicht in Vorlage) für Einwandbehandlung + FAQPage-Schema/GEO.

**Offene Punkte (vor Launch):**
- **ActiveCampaign-Formular:** aktuell natives Platzhalter-Formular mit Erfolgs-Fallback in `src/components/LeadForm.astro`. AC-Embed/Script von Pascal einsetzen (markierte Stelle), `data-track="lead"` übernehmen.
- **Domain:** `site` in `astro.config.mjs` ist Platzhalter (`steine-steuern.de`) — für Canonical/JSON-LD/robots-Sitemap beim Launch setzen.
- **Recht:** Datenschutz/Impressum/AGB sind noindex-Platzhalterseiten; Footer-Disclaimer als Platzhalter markiert → anwaltlich prüfen.
- **Tracking:** Matomo + Google-Ads-Conversion + Meta Pixel als kommentierte Platzhalter in `Base.astro` (kein GA4) — IDs + Consent-Gating beim Launch.
- **Social Proof:** echte Testimonials/Investoren-Zahl + Presse-/Partner-Logos fehlen (nicht geliefert) → beim Kunden anfordern; aktuell nur belegte Fakten im Trust-Band (70+/20+/Garantie).
- **Fonts:** via Google Fonts eingebunden; optional Self-Hosting für letzten LCP-Feinschliff.

**Owner:** Pascal.
