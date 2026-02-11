/**
 * Session Manager
 * 
 * Handles pause/resume functionality for GGSD workflows
 * Saves session state to .planning/.session/ for recovery
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { planningFileExists, ensurePlanningDir } from './file-ops.js';

const SESSION_DIR = '.session';
const SESSION_FILE = 'current-session.json';

/**
 * Session state structure
 */
export class SessionState {
  constructor(data = {}) {
    this.command = data.command || null;           // Command being executed
    this.phase = data.phase || null;               // Current phase number
    this.step = data.step || null;                 // Step within command
    this.data = data.data || {};                   // Command-specific data
    this.timestamp = data.timestamp || new Date().toISOString();
    this.version = data.version || '1.0';
  }

  toJSON() {
    return {
      command: this.command,
      phase: this.phase,
      step: this.step,
      data: this.data,
      timestamp: this.timestamp,
      version: this.version
    };
  }
}

/**
 * Ensure session directory exists
 */
async function ensureSessionDir() {
  const planningDir = await ensurePlanningDir();
  const sessionDir = join(planningDir, SESSION_DIR);
  
  try {
    await fs.access(sessionDir);
  } catch {
    await fs.mkdir(sessionDir, { recursive: true });
  }
  
  return sessionDir;
}

/**
 * Get session file path
 */
async function getSessionPath() {
  const sessionDir = await ensureSessionDir();
  return join(sessionDir, SESSION_FILE);
}

/**
 * Check if a paused session exists
 */
export async function hasPausedSession() {
  try {
    const sessionPath = await getSessionPath();
    await fs.access(sessionPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save current session state
 */
export async function saveSession(state) {
  const sessionPath = await getSessionPath();
  const sessionState = new SessionState(state);
  
  await fs.writeFile(
    sessionPath,
    JSON.stringify(sessionState, null, 2),
    'utf8'
  );
  
  return sessionState;
}

/**
 * Load paused session
 */
export async function loadSession() {
  try {
    const sessionPath = await getSessionPath();
    const content = await fs.readFile(sessionPath, 'utf8');
    const data = JSON.parse(content);
    return new SessionState(data);
  } catch (err) {
    throw new Error(`Failed to load session: ${err.message}`);
  }
}

/**
 * Clear session (after successful completion or manual clear)
 */
export async function clearSession() {
  try {
    const sessionPath = await getSessionPath();
    await fs.unlink(sessionPath);
  } catch (err) {
    // Ignore if file doesn't exist
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}

/**
 * Create a session snapshot for error recovery
 */
export async function createErrorSnapshot(command, phase, data, error) {
  const sessionDir = await ensureSessionDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const snapshotPath = join(sessionDir, `error-${timestamp}.json`);
  
  const snapshot = {
    command,
    phase,
    data,
    error: {
      message: error.message,
      stack: error.stack
    },
    timestamp: new Date().toISOString()
  };
  
  await fs.writeFile(
    snapshotPath,
    JSON.stringify(snapshot, null, 2),
    'utf8'
  );
  
  return snapshotPath;
}

/**
 * List error snapshots
 */
export async function listErrorSnapshots() {
  try {
    const sessionDir = await ensureSessionDir();
    const files = await fs.readdir(sessionDir);
    
    const snapshots = files
      .filter(f => f.startsWith('error-'))
      .map(f => join(sessionDir, f));
    
    return snapshots;
  } catch {
    return [];
  }
}

/**
 * Auto-save wrapper for commands
 * Wraps a command function with auto-save on error
 */
export function withAutoSave(commandName, commandFn) {
  return async function(...args) {
    try {
      // Clear any old session before starting
      await clearSession();
      
      // Execute command
      return await commandFn(...args);
      
    } catch (err) {
      // Create error snapshot
      await createErrorSnapshot(
        commandName,
        args[0], // Assume first arg is phase number if applicable
        { args },
        err
      );
      
      // Re-throw error
      throw err;
    }
  };
}

/**
 * Session-aware command wrapper
 * Tracks progress through command execution
 */
export class SessionTracker {
  constructor(command, phase = null) {
    this.command = command;
    this.phase = phase;
    this.currentStep = null;
    this.data = {};
  }

  /**
   * Update current step
   */
  async updateStep(step, data = {}) {
    this.currentStep = step;
    this.data = { ...this.data, ...data };
    
    await saveSession({
      command: this.command,
      phase: this.phase,
      step: this.currentStep,
      data: this.data
    });
  }

  /**
   * Mark step complete
   */
  async completeStep(step) {
    this.data[`${step}_complete`] = true;
    await this.updateStep(step, {});
  }

  /**
   * Check if step is complete
   */
  isStepComplete(step) {
    return this.data[`${step}_complete`] === true;
  }

  /**
   * Get resumable data
   */
  getData() {
    return this.data;
  }

  /**
   * Clear session after successful completion
   */
  async complete() {
    await clearSession();
  }
}

/**
 * Format session for display
 */
export function formatSession(session) {
  const lines = [];
  
  lines.push(`Command: ${session.command}`);
  if (session.phase) {
    lines.push(`Phase: ${session.phase}`);
  }
  if (session.step) {
    lines.push(`Step: ${session.step}`);
  }
  lines.push(`Paused: ${formatTimestamp(session.timestamp)}`);
  
  return lines.join('\n');
}

/**
 * Format timestamp as relative time
 */
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}
