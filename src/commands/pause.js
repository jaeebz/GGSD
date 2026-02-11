/**
 * pause command
 * 
 * Manually save current session state and exit gracefully
 * Allows users to take a break and resume later
 */

import { saveSession, hasPausedSession } from '../utils/session-manager.js';
import { log, showError } from '../utils/display.js';
import { confirm } from '../utils/questions.js';

/**
 * Pause current work
 */
export async function pauseWork() {
  try {
    // Check if already paused
    if (await hasPausedSession()) {
      log.warning('A paused session already exists');
      
      const shouldOverwrite = await confirm(
        'Overwrite existing paused session?',
        false
      );
      
      if (!shouldOverwrite) {
        log.info('Pause cancelled');
        return;
      }
    }
    
    // In most cases, pause is called manually when nothing is running
    // So we save a minimal session that just indicates "paused"
    const session = {
      command: 'manual-pause',
      phase: null,
      step: 'paused',
      data: {
        pausedManually: true,
        message: 'Work paused by user'
      }
    };
    
    await saveSession(session);
    
    log.success('Work paused successfully');
    console.log('');
    log.info('Your progress has been saved');
    log.info('Resume anytime with: ggsd resume');
    console.log('');
    
  } catch (err) {
    showError('Failed to pause work', err.message);
    throw err;
  }
}

/**
 * Pause with context (called from within other commands)
 */
export async function pauseWithContext(command, phase, step, data) {
  try {
    const session = {
      command,
      phase,
      step,
      data
    };
    
    await saveSession(session);
    
    return session;
  } catch (err) {
    throw new Error(`Failed to pause ${command}: ${err.message}`);
  }
}
