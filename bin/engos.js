#!/usr/bin/env node

import { program } from 'commander'
import { initCommand } from '../src/commands/init.js'

program
  .name('engos')
  .description('Engineering Operating System — governance CLI')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize .engos/ governance structure in the current project')
  .action(initCommand)

program.parse()
