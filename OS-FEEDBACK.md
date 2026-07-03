# OS-FEEDBACK.md — KVP-Log dieses Klons

Dieses Log ist das Herz des kontinuierlichen Verbesserungsprozesses (KVP / Kaizen) für das Quell-OS. Jeder Klon führt sein eigenes Log. Verbesserungen wandern **nur nach gemeinsamer Analyse und Freigabe durch Pascal** zurück ins Quell-OS — nichts passiert automatisch, volle Kontrolle bleibt beim Menschen.

## Zwei Spuren

Jeder Eintrag ist entweder:

- **Reibung** — was schieflief, unklar war, gehakt hat. Fehler, Missverständnisse, Sackgassen.
- **Learning** — was besser funktioniert. Handwerks- und Qualitäts-Erkenntnisse: Bild-Benennung, Seitenaufbau, Textführung, Prozess-Tricks.

## Mindset: offene Augen

Nicht nur Fehler loggen. **Jede** Qualitäts- oder Prozess-Erkenntnis sofort festhalten, auch die kleinen. Ein besserer Weg, den du zufällig findest, ist genauso wertvoll wie ein Bug den du fixt. Wer mit offenen Augen arbeitet, macht das OS mit jedem Klon schärfer.

## Für die Build-Session

**Sofort eintragen.** Sobald während des Baus eine Erkenntnis auftaucht — Reibung oder Learning — hier notieren, nicht auf später verschieben. Nicht sammeln, nicht filtern, nicht warten. Der Review kommt später; das Loggen passiert jetzt.

## KVP-Zyklus

Beobachten → Loggen (hier) → Analysieren (Review-Ritual, Pascal entscheidet) → Umsetzen (Playbook/Skill schärfen, Status auf übernommen) → nächster Klon startet besser.

---

## Eintragsformat (Vorlage — kopieren)

```
## Datum — [Reibung | Learning] — Kurztitel
Beobachtung:  konkret, mit Beispiel
Betrifft:     welches OS-Artefakt (z.B. image-generation.md / build-page / Prozess)
Verbesserung: wie das OS dadurch besser wird
Status:       offen -> uebernommen (Datum)
```

---

## Beispiel-Einträge

## 2026-01-15 — Reibung — Hero-Bilder werden zu groß ausgeliefert
Beobachtung:  Der generierte Hero war 3,2 MB als PNG. Lighthouse-Score fiel auf 71, LCP über 4s. Musste manuell zu WebP konvertiert und auf ~180 KB gedrückt werden.
Betrifft:     generate-visuals / image-generation Playbook
Verbesserung: Playbook sollte WebP + Zielgröße (<200 KB Hero) als Default-Schritt erzwingen, nicht als Nachgedanke.
Status:       offen

## 2026-01-18 — Learning — Bild-Dateinamen als SEO-Hebel
Beobachtung:  Sprechende Dateinamen nach Schema `leistung-ort-kontext.webp` (z.B. `dachsanierung-bremen-vorher.webp`) statt `hero-1.webp` verbessern Bild-SEO und machen den Ordner ohne Öffnen lesbar.
Betrifft:     generate-visuals / Namenskonvention
Verbesserung: Namensschema als festen Bestandteil ins Playbook aufnehmen, Beispiel mitgeben.
Status:       offen
