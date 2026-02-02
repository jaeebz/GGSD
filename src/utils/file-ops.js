/**
 * File Operations Utilities
 * 
 * Handles reading/writing to .planning/ directory with size validation
 * Temporary implementation using fs - will be replaced with MCP servers in Phase 3
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Size limits (in bytes) for planning files
export const SIZE_LIMITS = {
  'PROJECT.md': 2048,         // 2KB
  'REQUIREMENTS.md': 5120,    // 5KB
  'ROADMAP.md': 3072,         // 3KB
  'STATE.md': 2048,           // 2KB
  'CONTEXT.md': 4096,         // 4KB
  'PLAN.md': 3072,            // 3KB
  'SUMMARY.md': 2048,         // 2KB
  'RESEARCH.md': 4096         // 4KB
};

/**
 * Ensure .planning directory exists
 */
export async function ensurePlanningDir() {
  const planningDir = join(process.cwd(), '.planning');
  
  try {
    await fs.access(planningDir);
  } catch {
    await fs.mkdir(planningDir, { recursive: true });
  }
  
  return planningDir;
}

/**
 * Write a planning file with size validation
 */
export async function writePlanningFile(filename, content) {
  const planningDir = await ensurePlanningDir();
  const filepath = join(planningDir, filename);
  
  // Check size limit
  const contentSize = Buffer.byteLength(content, 'utf8');
  const limit = SIZE_LIMITS[filename];
  
  if (limit && contentSize > limit) {
    throw new Error(
      `File ${filename} exceeds size limit: ${contentSize} bytes > ${limit} bytes`
    );
  }
  
  // Ensure parent directory exists
  await fs.mkdir(dirname(filepath), { recursive: true });
  
  // Write file
  await fs.writeFile(filepath, content, 'utf8');
  
  return filepath;
}

/**
 * Read a planning file
 */
export async function readPlanningFile(filename) {
  const planningDir = join(process.cwd(), '.planning');
  const filepath = join(planningDir, filename);
  
  try {
    return await fs.readFile(filepath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`Planning file not found: ${filename}`);
    }
    throw err;
  }
}

/**
 * Check if planning file exists
 */
export async function planningFileExists(filename) {
  const planningDir = join(process.cwd(), '.planning');
  const filepath = join(planningDir, filename);
  
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

/**
 * List files in planning directory
 */
export async function listPlanningFiles(subdir = '') {
  const planningDir = join(process.cwd(), '.planning', subdir);
  
  try {
    const files = await fs.readdir(planningDir);
    return files;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

/**
 * Create planning subdirectory
 */
export async function createPlanningSubdir(subdir) {
  const planningDir = await ensurePlanningDir();
  const subdirPath = join(planningDir, subdir);
  
  await fs.mkdir(subdirPath, { recursive: true });
  
  return subdirPath;
}

/**
 * Get file size in bytes
 */
export async function getFileSize(filename) {
  const planningDir = join(process.cwd(), '.planning');
  const filepath = join(planningDir, filename);
  
  try {
    const stats = await fs.stat(filepath);
    return stats.size;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return 0;
    }
    throw err;
  }
}

/**
 * Validate file size before writing
 */
export function validateFileSize(filename, content) {
  const contentSize = Buffer.byteLength(content, 'utf8');
  const limit = SIZE_LIMITS[filename];
  
  if (limit && contentSize > limit) {
    return {
      valid: false,
      size: contentSize,
      limit,
      message: `File ${filename} would exceed size limit: ${contentSize} bytes > ${limit} bytes`
    };
  }
  
  return {
    valid: true,
    size: contentSize,
    limit
  };
}
