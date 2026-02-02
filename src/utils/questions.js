/**
 * Question Flow Utilities
 * 
 * Helper functions for building interactive question flows with inquirer
 */

import inquirer from 'inquirer';

/**
 * Ask a single question
 */
export async function ask(question) {
  const answer = await inquirer.prompt([question]);
  return answer[question.name];
}

/**
 * Ask multiple questions
 */
export async function askMultiple(questions) {
  return await inquirer.prompt(questions);
}

/**
 * Confirm (yes/no question)
 */
export async function confirm(message, defaultValue = true) {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message,
      default: defaultValue
    }
  ]);
  return answer.confirmed;
}

/**
 * Ask for text input
 */
export async function askText(message, defaultValue = '') {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message,
      default: defaultValue
    }
  ]);
  return answer.text;
}

/**
 * Ask for multiline text
 */
export async function askMultiline(message) {
  const answer = await inquirer.prompt([
    {
      type: 'editor',
      name: 'text',
      message,
    }
  ]);
  return answer.text;
}

/**
 * Select from a list
 */
export async function select(message, choices) {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'selection',
      message,
      choices
    }
  ]);
  return answer.selection;
}

/**
 * Select multiple from a list
 */
export async function selectMultiple(message, choices) {
  const answer = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selections',
      message,
      choices
    }
  ]);
  return answer.selections;
}

/**
 * Project initialization questions
 */
export async function askProjectQuestions() {
  console.log('');
  console.log('Let\'s set up your project. I\'ll ask a few questions to understand what you\'re building.\n');
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What are you building?',
      validate: input => input.length > 0 || 'Project name is required'
    },
    {
      type: 'input',
      name: 'goal',
      message: 'What\'s the primary goal?',
      validate: input => input.length > 0 || 'Goal is required'
    },
    {
      type: 'input',
      name: 'technologies',
      message: 'Any specific technologies or stack? (optional)',
      default: ''
    },
    {
      type: 'input',
      name: 'constraints',
      message: 'Any constraints or requirements? (optional)',
      default: ''
    },
    {
      type: 'confirm',
      name: 'research',
      message: 'Should I research the domain before planning?',
      default: true
    }
  ]);
  
  return answers;
}

/**
 * Requirements extraction questions
 */
export async function askRequirementsQuestions(projectInfo) {
  console.log('');
  console.log('Now let\'s define what\'s in scope for v1.\n');
  
  const answers = await inquirer.prompt([
    {
      type: 'editor',
      name: 'v1Features',
      message: 'What features MUST be in v1? (one per line)',
      default: '- '
    },
    {
      type: 'editor',
      name: 'v2Features',
      message: 'What features would be NICE to have in v2? (one per line)',
      default: '- '
    },
    {
      type: 'editor',
      name: 'outOfScope',
      message: 'What\'s explicitly OUT of scope? (one per line)',
      default: '- '
    }
  ]);
  
  return answers;
}

/**
 * Roadmap confirmation
 */
export async function confirmRoadmap(roadmap) {
  console.log('');
  console.log('Here\'s the proposed roadmap:\n');
  console.log(roadmap);
  console.log('');
  
  return await confirm('Does this roadmap look good?', true);
}
