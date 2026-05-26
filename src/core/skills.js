import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates', 'skills')

function resolveSkills(context) {
  return [
    'grill-me.md',
    'tdd.md',
    'diagnose.md',
    'prototype.md',
    'to-prd.md',
    'webapp-testing.md',
    'improve-codebase-architecture.md',
  ]
}

export async function activateSkills(cwd, context) {
  const skillsDir = path.join(cwd, '.engos', 'skills')
  await fs.ensureDir(skillsDir)

  const skills = resolveSkills(context)
  for (const skill of skills) {
    const src = path.join(TEMPLATES_DIR, skill)
    const dest = path.join(skillsDir, skill)
    await fs.copy(src, dest)
  }
}
