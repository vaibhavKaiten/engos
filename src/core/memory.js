import path from 'path'
import fs from 'fs-extra'
import yaml from 'js-yaml'

export async function writeMemory(cwd, context) {
  const engosDir = path.join(cwd, '.engos')
  await fs.ensureDir(engosDir)

  const frontmatter = {
    project: {
      name: context.projectName,
      type: context.projectType,
      description: context.description,
      stage: context.stage,
      created_at: context.createdAt,
    },
    stack: context.stack,
    team: {
      size: context.teamSize,
    },
    requirements: [
      {
        id: 'REQ-001',
        title: context.firstFeature,
        status: 'planned',
        added_at: context.createdAt,
      },
    ],
    features: [
      {
        id: 'FEAT-001',
        title: context.firstFeature,
        status: 'planned',
        linked_requirements: ['REQ-001'],
      },
    ],
    decisions: [],
    changelog: [
      {
        date: context.createdAt,
        type: 'init',
        note: 'Project initialized via engos init',
      },
    ],
  }

  const yamlStr = yaml.dump(frontmatter, { lineWidth: 100 })

  const body = `---
${yamlStr}---

# ${context.projectName} — Project Memory

## What this project does
${context.description}

## Architecture overview
<!-- Fill this in as you make architectural decisions -->

## Key decisions
<!-- Record important decisions here. Format: ### DEC-001: Title\nReason: ...\nDate: ... -->

## Open questions
<!-- Things that need to be resolved -->

## Notes
<!-- Anything else the AI should know about this project -->
`

  await fs.writeFile(path.join(engosDir, 'memory.md'), body, 'utf8')
}

export async function readMemory(cwd) {
  const memPath = path.join(cwd, '.engos', 'memory.md')
  const raw = await fs.readFile(memPath, 'utf8')
  return raw
}

export async function patchMemory(cwd, patch) {
  const memPath = path.join(cwd, '.engos', 'memory.md')
  const raw = await fs.readFile(memPath, 'utf8')

  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fmMatch) throw new Error('memory.md has no valid YAML frontmatter')

  const parsed = yaml.load(fmMatch[1])

  if (patch.requirements) parsed.requirements = [...(parsed.requirements || []), ...patch.requirements]
  if (patch.features) parsed.features = [...(parsed.features || []), ...patch.features]
  if (patch.decisions) parsed.decisions = [...(parsed.decisions || []), ...patch.decisions]
  if (patch.changelog) parsed.changelog = [...(parsed.changelog || []), ...patch.changelog]

  const newYaml = yaml.dump(parsed, { lineWidth: 100 })
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, `---\n${newYaml}---\n`)
  await fs.writeFile(memPath, body, 'utf8')
}
