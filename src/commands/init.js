import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import { writeMemory } from '../core/memory.js'
import { activateSkills } from '../core/skills.js'
import { installGovernance } from '../core/governance.js'
import { generateBridgeFiles } from '../core/bridge.js'

const QUESTIONS = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name?',
    validate: (v) => v.trim().length > 0 || 'Required',
  },
  {
    type: 'list',
    name: 'projectType',
    message: 'Project type?',
    choices: ['saas', 'api-only', 'internal-tool', 'fullstack'],
  },
  {
    type: 'list',
    name: 'stage',
    message: 'Current stage?',
    choices: ['greenfield', 'mvp', 'growth', 'scaling'],
  },
  {
    type: 'list',
    name: 'frontend',
    message: 'Frontend framework?',
    choices: ['next.js', 'react', 'vue', 'svelte', 'none'],
  },
  {
    type: 'list',
    name: 'backend',
    message: 'Backend?',
    choices: ['express', 'fastify', 'next.js api routes', 'none'],
  },
  {
    type: 'list',
    name: 'database',
    message: 'Database?',
    choices: ['postgresql', 'mysql', 'mongodb', 'sqlite', 'none'],
  },
  {
    type: 'list',
    name: 'auth',
    message: 'Auth approach?',
    choices: ['jwt', 'sessions', 'oauth', 'clerk', 'supabase auth', 'none'],
  },
  {
    type: 'list',
    name: 'teamSize',
    message: 'Team size?',
    choices: ['solo', 'small (2-5)', 'medium (6-15)', 'large (15+)'],
  },
  {
    type: 'input',
    name: 'description',
    message: 'One sentence describing what this project does?',
    validate: (v) => v.trim().length > 0 || 'Required',
  },
  {
    type: 'input',
    name: 'firstFeature',
    message: 'What is the first feature you are building?',
    validate: (v) => v.trim().length > 0 || 'Required',
  },
]

export async function initCommand() {
  const cwd = process.cwd()

  const memPath = path.join(cwd, '.engos', 'memory.md')
  const alreadyInitialized = await fs.pathExists(memPath)
  let skipMemory = false

  if (alreadyInitialized) {
    const { shouldContinue } = await inquirer.prompt([{
      type: 'confirm',
      name: 'shouldContinue',
      message: '.engos/memory.md already exists. Re-run init? (memory.md will be preserved, other files overwritten)',
      default: false,
    }])
    if (!shouldContinue) {
      console.log(chalk.yellow('\n  Aborted. Your existing .engos/ is unchanged.\n'))
      process.exit(0)
    }
    skipMemory = true
  }

  console.log(chalk.bold('\n  ENGOS — Engineering Operating System'))
  console.log(chalk.dim('  Answer these questions to initialize your project governance.\n'))

  const answers = await inquirer.prompt(QUESTIONS)

  const context = {
    projectName: answers.projectName.trim(),
    projectType: answers.projectType,
    stage: answers.stage,
    stack: {
      frontend: answers.frontend,
      backend: answers.backend,
      database: answers.database,
      auth: answers.auth,
    },
    teamSize: answers.teamSize,
    description: answers.description.trim(),
    firstFeature: answers.firstFeature.trim(),
    createdAt: new Date().toISOString().split('T')[0],
  }

  console.log(chalk.dim('\n  Initializing .engos/ structure...\n'))

  if (!skipMemory) {
    await writeMemory(cwd, context)
    console.log(chalk.green('  ✓') + '  memory.md written')
  } else {
    console.log(chalk.yellow('  ⊘') + '  memory.md preserved (skipped)')
  }

  await installGovernance(cwd, context)
  console.log(chalk.green('  ✓') + '  governance/ installed')

  await activateSkills(cwd, context)
  console.log(chalk.green('  ✓') + '  skills/ activated')

  await generateBridgeFiles(cwd, context)
  console.log(chalk.green('  ✓') + '  bridge files generated (CLAUDE.md, AGENTS.md, Cursor, Copilot)')

  console.log(chalk.bold('\n  .engos/ is ready. Open this project in Cursor, Claude Code, or Copilot.\n'))
  console.log(chalk.dim('  The AI will read .engos/memory.md before writing any code.'))
  console.log(chalk.dim('  Governance standards in .engos/governance/ apply to all code.'))
  console.log(chalk.dim('  Skills in .engos/skills/ are available as on-demand workflows.\n'))
}
