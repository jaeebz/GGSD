/**
 * Display Utilities
 * 
 * Formatted console output with colors and spinners
 */

import chalk from 'chalk';
import ora from 'ora';

/**
 * Create a spinner
 */
export function spinner(text) {
  return ora({
    text,
    color: 'cyan'
  });
}

/**
 * Log utilities
 */
export const log = {
  info: (msg) => console.log(chalk.cyan('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  
  header: (msg) => {
    console.log('');
    console.log(chalk.bold.cyan(msg));
    console.log(chalk.cyan('━'.repeat(msg.length)));
    console.log('');
  },
  
  section: (msg) => {
    console.log('');
    console.log(chalk.bold(msg));
  },
  
  plain: (msg) => console.log(msg)
};

/**
 * Format file path for display
 */
export function formatPath(path) {
  return chalk.dim(path);
}

/**
 * Format command for display
 */
export function formatCommand(cmd) {
  return chalk.cyan(cmd);
}

/**
 * Show created files
 */
export function showCreatedFiles(files) {
  console.log('');
  log.section('Created files:');
  files.forEach(file => {
    log.success(formatPath(file));
  });
  console.log('');
}

/**
 * Show next steps
 */
export function showNextSteps(steps) {
  console.log('');
  log.section('Next steps:');
  steps.forEach((step, i) => {
    console.log(chalk.dim(`  ${i + 1}.`), step);
  });
  console.log('');
}

/**
 * Show error with details
 */
export function showError(message, details = null) {
  console.log('');
  log.error(message);
  if (details) {
    console.log(chalk.dim(details));
  }
  console.log('');
}
