import path from 'path'
import fs from 'fs-extra'

const ALL_SKILLS = [
  'grill-me.md — before starting any new feature or design decision',
  'tdd.md — when writing or modifying any code',
  'diagnose.md — when debugging a bug or regression',
  'prototype.md — when exploring an idea quickly before committing',
  'to-prd.md — when turning a conversation into a formal spec',
  'webapp-testing.md — when writing or reviewing tests',
  'improve-codebase-architecture.md — when reviewing overall code structure',
]

const ALL_GOVERNANCE = [
  'web-design-guidelines.md — UI and visual quality standards (always apply)',
  'react-best-practices.md — React/Next.js performance rules (always apply)',
  'frontend-design.md — component and design system standards (always apply)',
  'dbth.md — database schema and query standards (always apply)',
]

function claudeMd(context) {
  return `# ${context.projectName} — ENGOS Context

This project is managed by ENGOS. Read the files below before writing any code.

## Read first
- \`.engos/memory.md\` — project context, tech stack, active requirements, decisions, and changelog

## Governance — apply to ALL code you write
${ALL_GOVERNANCE.map((g) => `- \`.engos/governance/${g.split(' — ')[0]}\` — ${g.split(' — ')[1]}`).join('\n')}

## Skills — workflows to follow when doing specific tasks
${ALL_SKILLS.map((s) => `- \`.engos/skills/${s.split(' — ')[0]}\` — ${s.split(' — ')[1]}`).join('\n')}

## Project summary
- **Name**: ${context.projectName}
- **Type**: ${context.projectType}
- **Stage**: ${context.stage}
- **Stack**: ${context.stack.frontend} / ${context.stack.backend} / ${context.stack.database}
- **Description**: ${context.description}
`
}

function agentsMd(context) {
  return `# ${context.projectName} — Agent Instructions

## Context
Read \`.engos/memory.md\` before starting any task.

## Coding standards
${ALL_GOVERNANCE.map((g) => `- \`.engos/governance/${g.split(' — ')[0]}\``).join('\n')}

## Skill workflows
${ALL_SKILLS.map((s) => `- \`.engos/skills/${s.split(' — ')[0]}\``).join('\n')}
`
}

function cursorRule(context) {
  return `---
description: ENGOS project context and coding standards for ${context.projectName}
alwaysApply: true
---

Always read \`.engos/memory.md\` before writing code. It contains the project stack, active requirements, and decisions.

Apply every standard in \`.engos/governance/\` to all code you produce:
${ALL_GOVERNANCE.map((g) => `- ${g.split(' — ')[0]}: ${g.split(' — ')[1]}`).join('\n')}

Available skill workflows in \`.engos/skills/\`:
${ALL_SKILLS.map((s) => `- ${s}`).join('\n')}
`
}

function copilotInstructions(context) {
  return `# GitHub Copilot Instructions — ${context.projectName}

Before writing code, read \`.engos/memory.md\` for complete project context.

Apply these standards to all code:
${ALL_GOVERNANCE.map((g) => `- .engos/governance/${g.split(' — ')[0]}: ${g.split(' — ')[1]}`).join('\n')}

Use these skill workflows for specific tasks:
${ALL_SKILLS.map((s) => `- .engos/skills/${s}`).join('\n')}
`
}

export async function generateBridgeFiles(cwd, context) {
  await fs.writeFile(path.join(cwd, 'CLAUDE.md'), claudeMd(context), 'utf8')
  await fs.writeFile(path.join(cwd, 'AGENTS.md'), agentsMd(context), 'utf8')

  const cursorDir = path.join(cwd, '.cursor', 'rules')
  await fs.ensureDir(cursorDir)
  await fs.writeFile(path.join(cursorDir, '000-engos.mdc'), cursorRule(context), 'utf8')

  const githubDir = path.join(cwd, '.github')
  await fs.ensureDir(githubDir)
  await fs.writeFile(path.join(githubDir, 'copilot-instructions.md'), copilotInstructions(context), 'utf8')
}
