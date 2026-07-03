---
name: os-review
description: Use to run the KVP review of the Website-AIOS across all clones — collect their OS-FEEDBACK.md logs, cluster the open entries by affected OS artifact, and propose concrete improvements to the source OS for Pascal to decide on. Trigger on "os review", "feedback logs auswerten", "os verbessern", "kvp". Ändert nichts am Quell-OS ohne Freigabe. Ein Lauf = Entscheidungs-Tabelle vorlegen, nach Freigabe umsetzen + Klon-Logs auf "übernommen" setzen.
---

# OS-Review (KVP)

Das Review-Ritual des KVP (Kontinuierlicher Verbesserungsprozess). Jeder Klon führt ein `OS-FEEDBACK.md` mit zwei Spuren — Reibung (was schieflief) und Learning (was besser funktioniert). Dieser Skill sammelt diese Logs ein, verdichtet sie und legt Pascal Verbesserungen fürs Quell-OS zur Entscheidung vor.

**Grundregel: Dieser Skill ändert NICHTS am Quell-OS ohne Freigabe durch Pascal.** Erst analysieren und vorschlagen, dann — nach Freigabe — umsetzen.

Das Quell-OS ist dieses Repo (Website-AIOS). Klone liegen als Geschwister-Ordner daneben (z.B. `../likovo-site`, `../agosbau-site`).

## Wann laufen

- Wenn Pascal "os review" / "kvp" / "feedback logs auswerten" / "os verbessern" sagt.
- Als regelmäßiges Ritual (z.B. nach Abschluss eines Klon-Projekts oder monatlich).

## Schritte

### 1. Logs einsammeln

- Ermittle das Verzeichnis über diesem Repo (Parent von Website-AIOS).
- Suche in allen Geschwister-Ordnern nach `OS-FEEDBACK.md` (Klone). Prüfe auch, ob das Quell-OS selbst ein `OS-FEEDBACK.md` hat (Eigenbeobachtungen).
- Lies jede gefundene Datei vollständig. Notiere pro Eintrag: Herkunfts-Klon, Datum, Spur (Reibung | Learning), Kurztitel, Beobachtung, Betrifft, Verbesserung, Status.

### 2. Filtern

- Nimm nur Einträge mit **Status: offen**. Einträge mit "übernommen (Datum)" sind erledigt — überspringen, aber merken (für Kontext).
- Wenn keine offenen Einträge existieren: das melden und stoppen. Nichts vorschlagen.

### 3. Clustern

- Gruppiere die offenen Einträge nach **betroffenem OS-Artefakt** (Feld "Betrifft") — z.B. `references/image-generation.md`, Skill `build-page`, ein Prozess, ein Playbook.
- Einträge, die dasselbe Artefakt oder dieselbe Ursache treffen, kommen in einen Cluster — auch wenn sie aus verschiedenen Klonen stammen (mehrfaches Auftreten = höhere Priorität).
- Reibung und Learning können im selben Cluster landen, wenn sie dasselbe Artefakt betreffen.

### 4. Verbesserung pro Cluster formulieren

Pro Cluster genau einen konkreten Verbesserungsvorschlag fürs Quell-OS:
- **Was ändern:** exaktes Ziel-Artefakt (Datei/Skill) und was daran.
- **Warum:** kurze Begründung aus den Beobachtungen (mit Beispiel).
- **Belege:** welche Klone/Einträge das stützen (je mehr, desto stärker).
- **Aufwand:** grob (klein / mittel / groß).

### 5. Entscheidungs-Tabelle vorlegen

Zeig Pascal eine Tabelle. Ändere NICHTS. Eine Zeile pro Cluster:

| # | Betrifft (Artefakt) | Beobachtung (kurz) | Vorschlag | Belege (Klone) | Aufwand | Entscheidung |
|---|---------------------|--------------------|-----------|----------------|---------|--------------|

Die Spalte "Entscheidung" bleibt leer. Pascal entscheidet je Zeile: **übernehmen / später / verwerfen**.

Frag danach explizit nach den Entscheidungen. Warte auf Freigabe.

### 6. Umsetzen (nur nach Freigabe)

Für jede Zeile, die Pascal auf **übernehmen** gesetzt hat:
- Setze die Verbesserung im Quell-OS um — das Ziel-Artefakt schärfen (Playbook/Skill/Reference gezielt editieren, nicht neu schreiben).
- Halte die Änderung generisch (Template-Ebene, keine Kunden-Spezifika).
- Setze im **jeweiligen Klon-Log** (`OS-FEEDBACK.md` des Herkunfts-Klons) den Status des Eintrags von `offen` auf `übernommen (YYYY-MM-DD)`. Betrifft ein Cluster mehrere Klone, alle betroffenen Einträge aktualisieren.

Für **später**: Eintrag unverändert auf `offen` lassen (kommt beim nächsten Review wieder hoch).

Für **verwerfen**: im Klon-Log Status auf `verworfen (YYYY-MM-DD)` setzen, kurz warum. Nicht wieder vorschlagen.

### 7. Abschluss

- Fasse zusammen: welche Cluster übernommen (mit geänderten Quell-OS-Dateien), welche später, welche verworfen.
- Wenn Quell-OS-Dateien geändert wurden, weise darauf hin, dass die Änderungen committet werden sollten (main, Solo-Repo). Neue Klone starten dadurch besser; laufende Klone bekommen die Verbesserung beim nächsten frischen Aufsetzen.

## Prinzip

Beobachten → Loggen (in den Klonen) → **Analysieren (dieser Skill, Pascal entscheidet)** → Umsetzen → nächster Klon startet besser. Volle Kontrolle bei Pascal, nichts wandert automatisch ins Quell-OS.
