# OS-Verbesserung: KVP-Loop (Kaizen aufs OS)

> Zweck: Definiert, wie das Quell-OS (Website-AIOS Template) über die Zeit besser wird — nicht durch automatischen Klon-Sync, sondern durch einen kontinuierlichen Verbesserungsprozess (KVP / Kaizen). Jeder Klon beobachtet, loggt und liefert Verbesserungsvorschläge. Der Transfer ins Quell-OS passiert **nur** nach gemeinsamer Analyse und Freigabe durch Pascal.
>
> Diese Datei ERSETZT das alte `os-sync.md`-Modell (Auto-Sync via `update-from-os` / `promote-to-os`). Diese Mechanik gibt es nicht mehr.

## Prinzip

- **KVP statt Auto-Sync.** Verbesserungen fließen nicht automatisch zwischen Klon und Quell-OS. Statt eines technischen Sync-Kanals gibt es einen menschlichen Review-Prozess: beobachten → loggen → analysieren → bewusst übernehmen.
- **Warum kein Auto-Sync.** Automatischer Klon-Sync ist gefährlich: er kann kundenspezifische Anpassungen zurück ins Template drücken, unfertige Ideen als Standard verewigen und den Überblick zerstören, welche Version welchen Stand hat. Ein Klon ist ein eigenständiges Client-Repo, kein Zweig eines lebenden Templates.
- **Kontrolle bleibt bei Pascal.** Nichts wandert ohne Freigabe ins Quell-OS. Jeder Vorschlag wird bewusst geprüft, generalisiert (Kunden-Spezifika raus) und erst dann ins Template gehoben. So bleibt das OS scharf statt aufgebläht.
- **Offene Augen, sofort loggen.** Der Loop lebt nur, wenn jede Qualitäts- oder Prozess-Erkenntnis sofort im Log landet — nicht nur Fehler. Ein Learning, das nicht geloggt wird, ist verloren, sobald der Klon abgeschlossen ist.

## Das Log: `OS-FEEDBACK.md` mit zwei Spuren

Jeder Klon führt in seinem Repo-Root ein `OS-FEEDBACK.md`. Es hat zwei Spuren:

1. **Reibung** — was schieflief, unklar war, doppelte Arbeit verursachte oder eine Anweisung, die nicht passte. Das negative Signal: hier hakt das OS.
2. **Learning** — was besser funktioniert hat. Handwerks- und Qualitäts-Erkenntnisse: eine bessere Bild-Benennung, ein Seitenaufbau, der konvertiert, eine Textführung, die trägt. Das positive Signal: so wird das OS besser.

Beide Spuren sind gleich wichtig. Reibung schärft das OS an schwachen Stellen, Learnings heben das Niveau. Wer nur Fehler loggt, verschenkt die Hälfte.

### Eintragsformat (einheitlich)

```
## Datum — [Reibung | Learning] — Kurztitel
Beobachtung:  konkret, mit Beispiel
Betrifft:     welches OS-Artefakt (z. B. image-generation.md / build-page / Prozess)
Verbesserung: wie das OS dadurch besser wird
Status:       offen -> uebernommen (Datum)
```

Regeln:

- **Konkret mit Beispiel.** „Alt-Text war umständlich" ist wertlos. „Alt-Text-Regel in image-generation.md führt zu Keyword-Stuffing, Beispiel: `dachdecker-bremen-dach-dachdecker-handwerk.webp`" ist umsetzbar.
- **Immer ein Artefakt benennen.** Jeder Eintrag zeigt auf eine konkrete Datei/Skill/einen Prozess. Ohne Adressat kann die Verbesserung nicht landen.
- **Status ehrlich pflegen.** `offen`, bis der Vorschlag im Review behandelt wurde. Dann `uebernommen (Datum)` oder `verworfen (Grund)`. So sieht man auf einen Blick, was noch offen ist.

## Der 5-Schritt-Zyklus

1. **Beobachten.** Während der Arbeit am Klon (Build, Content, Visuals, Deploy) mit offenen Augen: Wo stockt es? Was war besser als erwartet? Jede Prozess- oder Qualitätserkenntnis ist ein Kandidat.
2. **Loggen.** Erkenntnis sofort als Eintrag in `OS-FEEDBACK.md` festhalten — richtige Spur (Reibung/Learning), Format einhalten, Artefakt benennen. Sofort, nicht „später sammeln".
3. **Analysieren.** Im Review-Ritual (siehe unten) werden die offenen Einträge gesammelt, geclustert und bewertet. Pascal entscheidet pro Cluster: übernehmen, anpassen, verwerfen.
4. **Umsetzen.** Für jeden freigegebenen Vorschlag: das betroffene Playbook/Skill/Referenz im **Quell-OS** manuell schärfen. Danach den Log-Eintrag im Klon auf `uebernommen (Datum)` setzen.
5. **Nächster Klon startet besser.** Neue Projekte werden aus dem aktualisierten Quell-OS frisch geklont und erben die Verbesserung. Bestehende Klone bleiben unangetastet (kein Rück-Sync) — sie sind fertige Client-Repos.

## Das Review-Ritual

Der `os-review`-Skill treibt Schritt 3 und 4:

1. **Sammeln.** Liest offene Einträge aus `OS-FEEDBACK.md` (des aktuellen Klons; bei mehreren Klonen die jeweiligen Logs).
2. **Clustern.** Gruppiert Einträge, die dasselbe Artefakt oder dasselbe Muster betreffen (z. B. drei Reibungspunkte an `build-page`, zwei Learnings zu Bild-Benennung). Cluster machen aus Einzelbeobachtungen ein Muster — und ein Muster ist ein echter OS-Fix.
3. **Vorlegen.** Präsentiert Pascal die Cluster mit Vorschlag je Cluster. Pascal entscheidet: übernehmen / anpassen / verwerfen. Nichts läuft automatisch.
4. **Manuell übernehmen.** Für freigegebene Cluster wird die Änderung direkt im Quell-OS geschrieben (Write/Edit auf die Template-Datei). Kein Kopier-Automatismus, kein Push aus dem Klon ins Template.
5. **Status zurückschreiben.** Behandelte Log-Einträge auf `uebernommen (Datum)` bzw. `verworfen (Grund)` setzen.

Kadenz: am Ende jedes Klon-Projekts, plus ein regelmäßiger Sammel-Review über alle offenen Logs.

## Wie eine Erkenntnis ein Playbook/Skill schärft

Beispiel — ein Learning zur Bild-Benennung wird zu einer OS-Verbesserung:

**Log-Eintrag im Klon (`OS-FEEDBACK.md`):**

```
## 2026-07-03 — Learning — Bild-Dateinamen: Ort vor Motiv
Beobachtung:  Namen wie `handwerk-dachdecker-dach.webp` waren austauschbar
              und schwach für lokale Suche. Muster `{leistung}-{ort}-{motiv}.webp`
              (z. B. `dachsanierung-bremen-vorher-nachher.webp`) war klarer,
              besser für Local-SEO und sofort sortierbar.
Betrifft:     references/playbooks/image-generation.md (Schritt 9, Dateiname)
Verbesserung: Benennungs-Konvention {leistung}-{ort}-{motiv} als Standard,
              kein Keyword-Stuffing, ein Keyword pro Name.
Status:       offen
```

**Im Review:** Pascal gibt frei. Der `os-review`-Skill (oder Pascal manuell) schärft dann `image-generation.md` — konkret Schritt 9 „Alt-Text & Dateiname setzen" und die Checkliste — um die Konvention:

> Dateiname-Muster: `{leistung}-{ort}-{motiv}.webp`, kebab-case, genau ein Keyword, kein Stuffing. Beispiel: `dachsanierung-bremen-vorher-nachher.webp`.

**Danach:** Log-Status im Klon auf `uebernommen (2026-07-xx)`. Der nächste frisch geklonte Klon hat die schärfere Regel von Anfang an — die Reibung tritt dort nie wieder auf.

So wird aus einer beiläufigen Beobachtung am lebenden Projekt eine dauerhafte Verbesserung im OS. Das ist der ganze Loop: das OS lernt aus jedem Projekt, aber nur was Pascal freigibt, und nur einmal sauber generalisiert.

## Checkliste (pro Klon)

- [ ] `OS-FEEDBACK.md` im Repo-Root angelegt
- [ ] Erkenntnisse SOFORT geloggt (beide Spuren: Reibung UND Learning)
- [ ] Jeder Eintrag im einheitlichen Format, mit konkretem Beispiel + benanntem Artefakt
- [ ] Am Projektende `os-review` gelaufen (sammeln + clustern)
- [ ] Pascal hat pro Cluster entschieden (übernehmen/anpassen/verwerfen)
- [ ] Freigegebene Verbesserungen manuell ins Quell-OS geschrieben (generalisiert, ohne Kunden-Spezifika)
- [ ] Log-Status auf `uebernommen (Datum)` / `verworfen (Grund)` gesetzt
