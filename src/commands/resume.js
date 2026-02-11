/**
 * resume command
 * 
 * Resume a paused session
 * Detects what was being done and continues from where it left off
 */

import { 
  loadSession, 
  clearSession, 
  hasPausedSession,
  formatSession 
} from '../utils/session-manager.js';
import { log, showError } from '../utils/display.js';
import { confirm } from '../utils/questions.js';
import chalk from 'chalk';

/**
 * Resume paused work
 */
export async function resumeWork() {
  try {
    // Check if there's a session to resume
    if (!await hasPausedSession()) {
      log.error('No paused session found');
      log.info('Start a new project with: ggsd new-project');
      return;
    }
    
    // Load session
    const session = await loadSession();
    
    // Display session info
    console.log('');
    log.section('📋 Paused Session Found');
    console.log('');
    console.log(formatSession(session));
    console.log('');
    
    // Confirm resume
    const shouldResume = await confirm('Resume this session?', true);
    
    if (!shouldResume) {
      log.info('Resume cancelled');
      
      const shouldClear = await confirm(
        'Clear the paused session?',
        false
      );
      
      if (shouldClear) {
        await clearSession();
        log.success('Paused session cleared');
      }
      
      return;
    }
    
    // Resume based on command type
    await resumeCommand(session);
    
  } catch (err) {
    showError('Failed to resume work', err.message);
    throw err;
  }
}

/**
 * Resume specific command
 */
async function resumeCommand(session) {
  const { command, phase, step, data } = session;
  
  switch (command) {
    case 'new-project':
      await resumeNewProject(session);
      break;
      
    case 'discuss-phase':
      await resumeDiscussPhase(session);
      break;
      
    case 'plan-phase':
      await resumePlanPhase(session);
      break;
      
    case 'execute-phase':
      await resumeExecutePhase(session);
      break;
      
    case 'manual-pause':
      log.info('Session was manually paused');
      log.info('No specific command to resume');
      await clearSession();
      break;
      
    default:
      log.warning(`Unknown command: ${command}`);
      log.info('Unable to automatically resume');
      log.info('You may need to restart the command manually');
      
      const shouldClear = await confirm('Clear this session?', true);
      if (shouldClear) {
        await clearSession();
      }
  }
}

/**
 * Resume new-project command
 */
async function resumeNewProject(session) {
  log.info('Resuming project initialization...');
  
  // Import and call with saved state
  const { newProject } = await import('./new-project.js');
  
  // For now, new-project doesn't support mid-resume
  // So we inform the user and clear
  log.warning('new-project does not support resume yet');
  log.info('You\'ll need to start over with: ggsd new-project');
  
  await clearSession();
}

/**
 * Resume discuss-phase command
 */
async function resumeDiscussPhase(session) {
  log.info(`Resuming discussion for phase ${session.phase}...`);
  
  // Import and call with saved state
  const { discussPhase } = await import('./discuss-phase.js');
  
  log.warning('discuss-phase does not support resume yet');
  log.info(`Restart with: ggsd discuss-phase ${session.phase}`);
  
  await clearSession();
}

/**
 * Resume plan-phase command
 */
async function resumePlanPhase(session) {
  log.info(`Resuming planning for phase ${session.phase}...`);
  
  const { planPhase } = await import('./plan-phase.js');
  
  log.warning('plan-phase does not support resume yet');
  log.info(`Restart with: ggsd plan-phase ${session.phase}`);
  
  await clearSession();
}

/**
 * Resume execute-phase command
 */
async function resumeExecutePhase(session) {
  log.info(`Resuming execution of phase ${session.phase}...`);
  
  const { executePhase } = await import('./execute-phase.js');
  
  log.warning('execute-phase does not support resume yet');
  log.info(`Restart with: ggsd execute-phase ${session.phase}`);
  
  await clearSession();
}

/**
 * Check for paused session on any command start
 * Call this at the beginning of long-running commands
 */
export async function checkForPausedSession(currentCommand) {
  if (!await hasPausedSession()) {
    return null;
  }
  
  const session = await loadSession();
  
  // If starting a different command, ask about the paused session
  if (session.command !== currentCommand && session.command !== 'manual-pause') {
    console.log('');
    log.warning('You have a paused session:');
    console.log('');
    console.log(chalk.dim(formatSession(session)));
    console.log('');
    
    const shouldResume = await confirm(
      'Resume the paused session instead?',
      false
    );
    
    if (shouldResume) {
      await resumeWork();
      return session; // Signal to caller to exit
    } else {
      const shouldClear = await confirm(
        'Clear the paused session?',
        true
      );
      
      if (shouldClear) {
        await clearSession();
        log.success('Paused session cleared');
      }
    }
  }
  
  return null;
}
