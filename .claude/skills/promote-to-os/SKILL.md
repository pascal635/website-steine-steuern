---
name: promote-to-os
description: Hebt generische Verbesserungen aus dem AKTUELLEN Klon zurück ins Quell-OS (Website-AIOS Template) und pusht sie. Trigger auf "promote to os", "ins quell-os", "sync os", "Verbesserung zurückspielen", "ins Template heben". Ein Lauf = OS-Ebene-Dateien diffen → kopieren → committen → pushen. Andere Klone holen es danach per update-from-os.
---

# Promote to OS — Verbesserungen ins Template zurückspielen

Dieses Skill läuft **im Klon** und hebt generische Verbesserungen (Skills, Playbooks, Scripts, Referenzen) zurück ins **Quell-OS** unter `/Users/pascalberlik/Documents/claude/Website-AIOS`. Es ist die Gegenrichtung zu `update-from-os`.

Goldene Regel: Nur OS-Ebene wandert nach oben. **Niemals** Kunden-Daten, Assets, Intake-Antworten, Entscheidungen oder Secrets. Im Zweifel: nicht promoten, Operator fragen.

## Step 0 — Pfade festlegen

- Klon = aktuelles Arbeitsverzeichnis (`cwd`).
- Quell-OS = `/Users/pascalberlik/Documents/claude/Website-AIOS`.

Prüfe, dass der Klon NICHT selbst das Quell-OS ist (Pfad-Vergleich). Wenn doch, abbrechen: "Du bist bereits im Quell-OS, nichts zu promoten."

## Step 1 — Manifest lesen

Read `references/os-sync.md` im Klon. Das Manifest listet:
- **OS-Ebene** (darf promotet werden): z.B. `.claude/skills/`, `references/playbooks/`, `scripts/`, generische `references/`, `EXPANSIONS.md`, die Skill-Templates.
- **Klon-Ebene** (NIEMALS promoten): `context/`, `assets/`, `intake/`, `decisions/`, `connections.md` (kundenspezifisch), `.env`, `CLAUDE.md` (klon-spezifisch befüllt).

Wenn `references/os-sync.md` fehlt: Operator informieren, dass das Manifest die Quelle der Wahrheit ist, und mit der konservativen Default-Liste oben weitermachen — aber nur nach expliziter Freigabe.

## Step 2 — Diffen und auflisten

Für jeden OS-Ebene-Pfad aus dem Manifest: vergleiche Klon gegen Quell-OS.

```bash
# pro Pfad, z.B. Skills:
diff -rq /<KLON>/.claude/skills /Users/pascalberlik/Documents/claude/Website-AIOS/.claude/skills
```

Sammle drei Kategorien:
1. **Geändert** — Datei existiert in beiden, Inhalt unterscheidet sich.
2. **Neu** — Datei nur im Klon (neue generische Fähigkeit).
3. **Nur im OS** — Datei nur im Quell-OS (NICHT anfassen, der Klon hat sie evtl. bewusst entfernt — nur melden).

Zeige dem Operator die Liste als Tabelle: Pfad | Status (geändert/neu) | 1-Zeilen-Notiz was sich ändert. Bei größeren Änderungen den eigentlichen `diff` zeigen, damit er den Inhalt prüfen kann.

**Stopp hier.** Frage: "Welche dieser Dateien sollen ins Quell-OS gehoben werden? (alle / Auswahl / keine)". Nichts ohne Bestätigung kopieren.

## Step 3 — Sicherheits-Gate

Bevor irgendetwas kopiert wird, jede ausgewählte Datei gegen die Verbots-Regeln prüfen:

- Pfad liegt unter `context/`, `assets/`, `intake/`, `decisions/` → **ablehnen**.
- Dateiname/Pfad enthält `.env`, `secrets`, `credentials`, `*.key`, `*.pem` → **ablehnen**.
- Inhalt enthält offensichtliche Secrets (API-Keys, Tokens, `GEMINI_API_KEY=`, Passwörter) → **ablehnen** und Operator warnen.
- Inhalt enthält Kunden-Spezifika (echte Domain, echter Firmenname, verifizierte Kunden-Daten, Calendly-Links) → **markieren** und Operator fragen, ob generisch gemacht werden soll, bevor es hochwandert.

Abgelehnte Dateien klar benennen und überspringen. Das Skill schreibt nie Secrets oder Kunden-Daten ins Template.

## Step 4 — Ins Quell-OS kopieren

Nur die freigegebenen, durch das Gate gekommenen Dateien kopieren. Ordner im Quell-OS bei Bedarf anlegen.

```bash
# Beispiel pro Datei (absolute Pfade):
mkdir -p /Users/pascalberlik/Documents/claude/Website-AIOS/<ziel-ordner>
cp /<KLON>/<datei> /Users/pascalberlik/Documents/claude/Website-AIOS/<datei>
```

Nur die im Manifest erlaubten OS-Pfade beschreiben. Niemals außerhalb davon.

## Step 5 — Committen und pushen

Im Quell-OS (`/Users/pascalberlik/Documents/claude/Website-AIOS`):

```bash
git -C /Users/pascalberlik/Documents/claude/Website-AIOS add <nur die kopierten Pfade>
git -C /Users/pascalberlik/Documents/claude/Website-AIOS status   # prüfen: nur erwartete Dateien staged
git -C /Users/pascalberlik/Documents/claude/Website-AIOS commit -m "<aussagekräftige Message>"
git -C /Users/pascalberlik/Documents/claude/Website-AIOS push
```

Commit-Message-Format: was + warum, z.B.
`promote: generate-visuals — Higgsfield-Audio-Slot ergänzt (aus Klon geerntet)`
oder
`promote: image-generation playbook — neuer Negative-Prompt-Block`.

Vor dem Commit `git status` zeigen und bestätigen lassen, dass nur die erwarteten Dateien staged sind. Bei `git push`-Fehler (kein Upstream / Auth) den Fehler melden, nicht erraten.

## Step 6 — Abschluss

Melde dem Operator:
- Welche Dateien gehoben wurden (Liste).
- Was übersprungen/abgelehnt wurde und warum.
- Commit-Hash + dass gepusht wurde.
- **Hinweis:** Andere Klone ziehen diese Verbesserung beim nächsten Lauf von `update-from-os`. Dieser Klon ist bereits aktuell.

## Leitplanken

- Richtung ist immer Klon → Quell-OS. Nie umgekehrt (das macht `update-from-os`).
- Nur generischer Code/Inhalt. Wenn etwas nur für DIESEN Kunden Sinn ergibt, bleibt es im Klon.
- Im Zweifel lieber weniger promoten und nachfragen.
- Niemals `decisions/log.md` des Klons antasten — Entscheidungen sind klon-lokal.
