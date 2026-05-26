import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates', 'governance')

const GOVERNANCE_FILES = [
  'web-design-guidelines.md',
  'react-best-practices.md',
  'frontend-design.md',
  'dbth.md',
]

export async function installGovernance(cwd) {
  const govDir = path.join(cwd, '.engos', 'governance')
  await fs.ensureDir(govDir)

  for (const file of GOVERNANCE_FILES) {
    const src = path.join(TEMPLATES_DIR, file)
    const dest = path.join(govDir, file)
    await fs.copy(src, dest)
  }
}
