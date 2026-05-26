# ENGOS

**Engineering Operating System** — a CLI you run once before vibe-coding a SaaS project. It scaffolds a `.engos/` governance folder and generates bridge files so Cursor, Claude Code, and GitHub Copilot know where to find project context, standards, and workflows.

```bash
engos init
```

## What it does

`engos init` asks a short set of questions about your project, then creates:

| Output | Purpose |
|--------|---------|
| `.engos/memory.md` | Project context, stack, requirements, decisions (YAML frontmatter + markdown) |
| `.engos/governance/` | Always-on coding standards (UI, React, frontend, database) |
| `.engos/skills/` | On-demand workflows (TDD, debugging, prototyping, etc.) |
| `CLAUDE.md` | Context for Claude Code |
| `AGENTS.md` | Context for Codex and other agents |
| `.cursor/rules/000-engos.mdc` | Cursor rule (always apply) |
| `.github/copilot-instructions.md` | GitHub Copilot instructions |

After init, open the project in your editor. The AI should read `.engos/memory.md` before writing code and apply governance from `.engos/governance/`.

## Requirements

- **Node.js 18+** (ESM)
- **pnpm** (recommended; npm works for install too)

Install pnpm if needed:

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm setup
```

Restart your terminal after `pnpm setup` so the global bin directory is on your `PATH`.

Verify:

```bash
node -v    # v18+
pnpm -v
```

---

## Install the CLI on your machine

You only install ENGOS **once per laptop**. `engos init` is run **per project** in each app folder.

### Option A — Clone the repo and link globally (recommended for teammates)

Use this while the package is not on npm. Your friend clones the repo, installs dependencies, then **links the CLI globally** so `engos` is available everywhere.

```bash
git clone https://github.com/YOUR_ORG/ENGOS.git
cd ENGOS
pnpm install
pnpm add -g .
```

`pnpm add -g .` registers the `engos` binary from this folder on your system. You do **not** need to stay inside the ENGOS repo to use the command afterward.

Confirm it works:

```bash
engos --version
# 0.1.0

which engos
# e.g. ~/.local/share/pnpm/engos
```

If `engos` is not found, run `pnpm setup`, restart the terminal, or add to your shell profile:

```bash
export PATH="$HOME/.local/share/pnpm:$HOME/.local/share/pnpm/bin:$PATH"
```

**Updating after a `git pull`:** from the ENGOS repo directory run `pnpm install` then `pnpm add -g .` again to refresh the global link.

### Option B — Install from npm (when published)

```bash
pnpm add -g engos
# or: npm install -g engos
```

No clone required.

### Option C — Run without global install (try it once)

From the ENGOS repo, run the entry script directly from any project directory:

```bash
cd /path/to/your-app
node /path/to/ENGOS/bin/engos.js init
```

This does not put `engos` on your `PATH`; use Option A or B for daily use.

---

## Use it on a project

1. Create or open your app folder (empty or existing repo).
2. Run init:

```bash
cd my-saas-app
engos init
```

3. Answer the 10 prompts (name, type, stage, stack, team size, description, first feature).
4. Open the folder in Cursor, Claude Code, or VS Code with Copilot.

Example output:

```
  ENGOS — Engineering Operating System
  ...

  ✓  memory.md written
  ✓  governance/ installed
  ✓  skills/ activated
  ✓  bridge files generated (CLAUDE.md, AGENTS.md, Cursor, Copilot)

  .engos/ is ready.
```

### Project layout after init

```
my-saas-app/
├── AGENTS.md
├── CLAUDE.md
├── .cursor/
│   └── rules/
│       └── 000-engos.mdc
├── .github/
│   └── copilot-instructions.md
└── .engos/
    ├── memory.md
    ├── governance/
    │   ├── dbth.md
    │   ├── frontend-design.md
    │   ├── react-best-practices.md
    │   └── web-design-guidelines.md
    └── skills/
        ├── diagnose.md
        ├── grill-me.md
        ├── improve-codebase-architecture.md
        ├── prototype.md
        ├── tdd.md
        ├── to-prd.md
        └── webapp-testing.md
```

### Re-running init

If `.engos/memory.md` already exists, ENGOS asks before continuing. If you confirm:

- **memory.md is preserved** (your edits and YAML state stay)
- governance, skills, and bridge files are **refreshed** from templates

If you decline, nothing changes.

---

## Configure your editor (optional)

ENGOS writes bridge files automatically. No extra config is required for:

- **Cursor** — reads `.cursor/rules/000-engos.mdc` (always apply)
- **Claude Code** — reads `CLAUDE.md` at repo root
- **GitHub Copilot** — reads `.github/copilot-instructions.md`

Commit `.engos/`, `CLAUDE.md`, `AGENTS.md`, `.cursor/`, and `.github/copilot-instructions.md` so your whole team gets the same context.

---

## Development (this repo)

```bash
git clone https://github.com/YOUR_ORG/ENGOS.git
cd ENGOS
pnpm install
chmod +x bin/engos.js

# Run without global link
pnpm dev init
# same as: node bin/engos.js init

# Or link globally while developing
pnpm add -g .
engos init
```

### Repo structure

```
ENGOS/
├── bin/engos.js              CLI entry
├── src/
│   ├── commands/init.js      init orchestration
│   ├── core/                 memory, governance, skills, bridge
│   └── templates/            skill + governance templates
├── package.json
└── .npmrc
```

---

## Commands (MVP)

| Command | Description |
|---------|-------------|
| `engos init` | Initialize `.engos/` and bridge files in the current directory |
| `engos --version` | Print version |
| `engos --help` | Show help |

Future milestones (not in MVP): `engos feature add`, `engos status`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `engos: command not found` | Run `pnpm setup`, restart terminal, or add pnpm bin to `PATH` (see Option A) |
| `pnpm: command not found` | Install Node, then `corepack enable` and `corepack prepare pnpm@latest --activate` |
| Global link fails on pnpm 11 | Use `pnpm add -g .` from the ENGOS repo instead of `pnpm link --global` |
| Init prompts look broken in a pipe | Run `engos init` in a real terminal (TTY); inquirer needs interactive input |

---

## License

Add your license here.
