#!/usr/bin/env node

/**
 * GGSD CLI Entry Point
 * 
 * Adapted from Get Shit Done by TÂCHES (glittercowboy)
 * https://github.com/glittercowboy/get-shit-done
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get package version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
);

const program = new Command();

program
  .name('ggsd')
  .description('Gemini Get Shit Done - Spec-driven development workflow')
  .version(packageJson.version);

// Core workflow commands
program
  .command('new-project')
  .description('Initialize new project with questions → research → roadmap')
  .action(async () => {
    const { newProject } = await import('../src/commands/new-project.js');
    await newProject();
  });

program
  .command('discuss-phase <phase>')
  .description('Capture implementation decisions for a phase')
  .action(async (phase) => {
    const { discussPhase } = await import('../src/commands/discuss-phase.js');
    await discussPhase(parseInt(phase));
  });

program
  .command('plan-phase <phase>')
  .description('Research and create verified plans for a phase')
  .action(async (phase) => {
    const { planPhase } = await import('../src/commands/plan-phase.js');
    await planPhase(parseInt(phase));
  });

program
  .command('execute-phase <phase>')
  .description('Execute all plans in a phase with parallel waves')
  .action(async (phase) => {
    const { executePhase } = await import('../src/commands/execute-phase.js');
    await executePhase(parseInt(phase));
  });

program
  .command('verify-work [phase]')
  .description('Manual user acceptance testing for a phase')
  .action(async (phase) => {
    const { verifyWork } = await import('../src/commands/verify-work.js');
    await verifyWork(phase ? parseInt(phase) : undefined);
  });

program
  .command('progress')
  .description('Show current project status and next steps')
  .action(async () => {
    const { showProgress } = await import('../src/commands/progress.js');
    await showProgress();
  });

// Phase management
program
  .command('add-phase')
  .description('Add a new phase to the roadmap')
  .action(async () => {
    const { addPhase } = await import('../src/commands/add-phase.js');
    await addPhase();
  });

program
  .command('insert-phase <position>')
  .description('Insert urgent phase at specific position')
  .action(async (position) => {
    const { insertPhase } = await import('../src/commands/insert-phase.js');
    await insertPhase(parseInt(position));
  });

// Milestone commands
program
  .command('complete-milestone')
  .description('Archive current milestone and tag release')
  .action(async () => {
    const { completeMilestone } = await import('../src/commands/complete-milestone.js');
    await completeMilestone();
  });

program
  .command('new-milestone [name]')
  .description('Start new milestone with fresh roadmap')
  .action(async (name) => {
    const { newMilestone } = await import('../src/commands/new-milestone.js');
    await newMilestone(name);
  });

// Utilities
program
  .command('quick')
  .description('Execute ad-hoc task with GGSD guarantees')
  .action(async () => {
    const { quickTask } = await import('../src/commands/quick.js');
    await quickTask();
  });

program
  .command('add-todo <description...>')
  .description('Capture idea for later')
  .action(async (description) => {
    const { addTodo } = await import('../src/commands/add-todo.js');
    await addTodo(description.join(' '));
  });

program
  .command('check-todos')
  .description('List pending todos')
  .action(async () => {
    const { checkTodos } = await import('../src/commands/check-todos.js');
    await checkTodos();
  });

// Brownfield
program
  .command('map-codebase')
  .description('Analyze existing codebase before new-project')
  .action(async () => {
    const { mapCodebase } = await import('../src/commands/map-codebase.js');
    await mapCodebase();
  });

// Help
program
  .command('help')
  .description('Show detailed help and usage guide')
  .action(() => {
    console.log(chalk.bold.cyan('\n🚀 GGSD - Gemini Get Shit Done\n'));
    console.log(chalk.gray('Spec-driven development workflow for Gemini CLI\n'));
    
    console.log(chalk.bold('Core Workflow:'));
    console.log('  ggsd new-project              Initialize project');
    console.log('  ggsd discuss-phase <N>        Capture decisions');
    console.log('  ggsd plan-phase <N>           Research and plan');
    console.log('  ggsd execute-phase <N>        Execute plans');
    console.log('  ggsd verify-work [N]          Manual testing');
    console.log('  ggsd progress                 Show status\n');
    
    console.log(chalk.bold('Phase Management:'));
    console.log('  ggsd add-phase                Append phase');
    console.log('  ggsd insert-phase <N>         Insert urgent phase\n');
    
    console.log(chalk.bold('Milestones:'));
    console.log('  ggsd complete-milestone       Archive and tag');
    console.log('  ggsd new-milestone [name]     Start next version\n');
    
    console.log(chalk.bold('Utilities:'));
    console.log('  ggsd quick                    Ad-hoc task');
    console.log('  ggsd add-todo <desc>          Capture idea');
    console.log('  ggsd check-todos              List todos');
    console.log('  ggsd map-codebase             Analyze codebase\n');
    
    console.log(chalk.gray('For more: https://github.com/YOUR_USERNAME/ggsd#readme'));
    console.log(chalk.gray('Original: https://github.com/glittercowboy/get-shit-done\n'));
  });

// Error handling
program.exitOverride();

try {
  await program.parseAsync(process.argv);
} catch (err) {
  if (err.code === 'commander.help') {
    process.exit(0);
  }
  console.error(chalk.red('Error:'), err.message);
  process.exit(1);
}
