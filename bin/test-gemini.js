#!/usr/bin/env node

/**
 * GGSD Gemini API Connection Test
 * 
 * Tests connectivity and model availability
 * Usage: node bin/test-gemini.js
 */

import { GeminiClient, MODELS } from '../src/gemini/client.js';

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';

function log(color, msg) { console.log(`${color}${msg}${RESET}`); }

async function testConnection(client, label, model, prompt) {
  process.stdout.write(`  Testing ${label} (${model})...`);
  const start = Date.now();
  try {
    const result = await client.generate(model, prompt, { maxOutputTokens: 32 });
    const ms = Date.now() - start;
    log(GREEN, ` ✅ ${ms}ms`);
    return { model, status: 'ok', ms, snippet: result.slice(0, 60) };
  } catch (err) {
    log(RED, ` ❌ ${err.message}`);
    return { model, status: 'fail', error: err.message };
  }
}

async function main() {
  console.log('');
  log(BOLD + CYAN, '🔌 GGSD Gemini API Connection Test');
  log(CYAN, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // 1. Check API key
  log(BOLD, '① Checking API key...');
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    log(RED, '  ❌ GEMINI_API_KEY is not set');
    log(YELLOW, '  Run: export GEMINI_API_KEY="your-key-here"');
    process.exit(1);
  }
  log(GREEN, `  ✅ API key found (${key.slice(0, 8)}...${key.slice(-4)})`);
  console.log('');

  // 2. Initialise client
  log(BOLD, '② Initialising Gemini client...');
  let client;
  try {
    client = new GeminiClient(key);
    log(GREEN, '  ✅ Client initialised');
  } catch (err) {
    log(RED, `  ❌ ${err.message}`);
    process.exit(1);
  }
  console.log('');

  // 3. Test each model used by GGSD
  log(BOLD, '③ Testing models...');
  const prompt = 'Reply with exactly one word: "hello"';
  const results = [];

  // Test each unique model in our config
  const modelTests = [
    { label: 'Flash (research/plan/exec/debug)', model: MODELS.RESEARCH },
    { label: 'Flash-Lite (verification)',        model: MODELS.VERIFICATION },
  ];

  for (const t of modelTests) {
    results.push(await testConnection(client, t.label, t.model, prompt));
  }
  console.log('');

  // 4. Summary
  log(BOLD, '④ Summary');
  const passed = results.filter(r => r.status === 'ok');
  const failed = results.filter(r => r.status === 'fail');

  if (failed.length === 0) {
    log(GREEN, `  ✅ All ${passed.length} model(s) responding`);
    log(GREEN, '  ✅ Gemini API connection is live');
    console.log('');
    log(CYAN, '  Models available:');
    for (const r of passed) {
      log(CYAN, `    • ${r.model} — ${r.ms}ms`);
    }
    console.log('');
    log(BOLD + GREEN, '🎉 Everything looks good! GGSD is ready to use.');
  } else {
    log(RED, `  ⚠️  ${passed.length} passed, ${failed.length} failed`);
    for (const r of failed) {
      log(RED, `    ✗ ${r.model}: ${r.error}`);
    }
    console.log('');

    // Check for common issues
    const errMsg = failed[0]?.error?.toUpperCase() || '';
    if (errMsg.includes('INVALID') || errMsg.includes('API_KEY') || errMsg.includes('UNAUTHENTICATED')) {
      log(YELLOW, '  💡 Looks like an API key issue. Double-check your key at:');
      log(YELLOW, '     https://aistudio.google.com/app/apikey');
    } else if (errMsg.includes('RATE_LIMIT') || errMsg.includes('RESOURCE_EXHAUSTED')) {
      log(YELLOW, '  💡 Rate limit hit. Wait a minute and try again.');
    } else if (errMsg.includes('NOT_FOUND') || errMsg.includes('404')) {
      log(YELLOW, '  💡 Model not found. It may have been renamed or deprecated.');
      log(YELLOW, '     We can update the model names in src/gemini/client.js');
    } else {
      log(YELLOW, '  💡 Check your network connection and try again.');
    }

    if (passed.length > 0) {
      log(YELLOW, '');
      log(YELLOW, '  Some models are working — GGSD may still function');
      log(YELLOW, '  with limited capability. Fix the failing models');
      log(YELLOW, '  in src/gemini/client.js before proceeding.');
    }
  }

  console.log('');
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(err => {
  log(RED, `\n❌ Unexpected error: ${err.message}`);
  process.exit(1);
});
