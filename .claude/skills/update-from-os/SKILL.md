---
name: update-from-os
description: Use to pull the latest OS-layer files (skills, references, playbooks, scripts, config) from the source OS into this clone without touching client files. Trigger on "update from os", "os aktualisieren", "neueste skills holen", "OS-Ebene updaten" or whenever a clone should refresh against the upstream template.
---

# Update From OS — die OS-Ebene aus dem Quell-OS nachziehen

Dieser Klon wurde aus dem Quell-OS (Template) geklont. Das Template entwickelt sich weiter — neue Skills, bessere Playbooks, gefixte Scripts. Dieses Skill holt **nur die OS-Ebene** nach, ohne die kundenspezifischen Dateien anzufassen.

**Zwei-Ebenen-Modell:**
- **OS-Ebene** (gehört dem Template): `.claude/skills/`, `references/`, `scripts/`, `.mcp.json`, plus alles im Manifest. Wird hier aktualisiert.
- **Kunden-Ebene** (gehört diesem Klon): `context/`, `assets/`, `intake/`, `decisions/`. Wird **niemals** angefasst.

## Step 1 — Manifest lesen

Read `references/os-sync.md`. Das Manifest listet exakt, welche Pfade zur OS-Ebene gehören. Diese Liste ist die Quelle der Wahrheit für das, was aktualisiert wird.

Wenn `references/os-sync.md` **nicht existiert**, nutze diese Standard-OS-Pfade und weise den User darauf hin, dass kein Manifest gefunden wurde:

```
.claude/skills/
references/
scripts/
.mcp.json
EXPANSIONS.md
```

Lies das Manifest komplett, bevor du etwas änderst. Aktualisiere ausschließlich gelistete Pfade.

## Step 2 — Voraussetzungen prüfen

Prüfe, dass dieser Klon ein Git-Repo mit `origin` ist:

```bash
git -C <repo-root> remote -v
```

Wenn kein `origin` gesetzt ist (z. B. Klon per `cp` statt `git clone`), brich ab und sag dem User: ohne `origin` zum Quell-OS kann nichts nachgezogen werden — `origin` setzen oder neu via `git clone` aufsetzen.

Wenn das Working-Tree unsaubere Änderungen an OS-Pfaden hat (`git status --short` zeigt OS-Pfade), warne den User: der Checkout überschreibt lokale Änderungen an diesen Dateien. Erst weitermachen, wenn der User bestätigt.

## Step 3 — Neuesten Stand holen

```bash
git -C <repo-root> fetch origin
```

Damit liegt der aktuelle Template-Stand als `origin/main` vor, ohne dass der lokale Branch verändert wird.

## Step 4 — OS-Pfade auschecken

Hol **nur** die OS-Pfade aus dem Manifest. So entstehen keine Merge-Konflikte mit `context/`, `assets/`, `intake/` oder `decisions/`, weil diese Pfade gar nicht angefasst werden:

```bash
git -C <repo-root> checkout origin/main -- <pfad-1> <pfad-2> <pfad-3> ...
```

Setze für `<pfad-N>` exakt die Einträge aus dem Manifest ein. Beispiel:

```bash
git -C <repo-root> checkout origin/main -- .claude/skills/ references/ scripts/ .mcp.json EXPANSIONS.md
```

Falls ein Pfad upstream nicht mehr existiert, ignoriert Git ihn mit einem Hinweis — das ist okay, weitermachen.

## Step 5 — Zeigen was sich geändert hat

Zeig dem User kurz und konkret, was sich verändert hat:

```bash
git -C <repo-root> status --short
git -C <repo-root> diff --stat
```

Fasse in eigenen Worten zusammen: welche Skills/Playbooks/Scripts neu, geändert oder entfernt wurden. Keine Wand aus Diffs — die Essenz.

## Step 6 — Abschluss-Hinweis

Sag dem User explizit:

- Die OS-Ebene ist auf dem neuesten Template-Stand.
- **Die Kunden-Ebene wurde nicht angefasst:** `context/`, `assets/`, `intake/`, `decisions/` sind unverändert.
- Die geholten Änderungen liegen jetzt **staged** im Working-Tree. Review dann committen, z. B.:

  ```bash
  git -C <repo-root> commit -m "chore: OS-Ebene aus Quell-OS nachgezogen"
  ```

- Wenn ein neues/geändertes Script (z. B. `scripts/generate-image.mjs`) dazukam, kurz prüfen, ob `.env`-Variablen (`GEMINI_API_KEY`) oder `.mcp.json`-Einträge (Higgsfield) noch passen.

## Was dieses Skill NICHT tut

- Kein `git merge`, kein `git pull` — wir ziehen gezielt Pfade, keine ganze History.
- Kein Anfassen der Kunden-Ebene.
- Kein automatischer Commit — der User reviewt erst.
