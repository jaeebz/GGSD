/**
 * Gemini API Client
 * 
 * Wrapper around Google's Generative AI SDK
 * Handles model selection, retries, and error handling
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Model selection based on task type
export const MODELS = {
  RESEARCH: 'gemini-2.0-flash-exp',      // Fast parallel research
  PLANNING: 'gemini-exp-1206',           // Deep reasoning
  EXECUTION: 'gemini-exp-1206',          // Code generation
  VERIFICATION: 'gemini-2.0-flash-exp',  // Quick checks
  DEBUGGING: 'gemini-exp-1206'           // Complex diagnosis
};

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2
};

export class GeminiClient {
  constructor(apiKey = process.env.GEMINI_API_KEY) {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable not set');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.activeRequests = new Map();
  }

  /**
   * Generate content with automatic retry logic
   */
  async generate(modelName, prompt, options = {}) {
    const model = this.genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        topK: options.topK ?? 40,
        topP: options.topP ?? 0.95,
        maxOutputTokens: options.maxOutputTokens ?? 8192,
      },
      safetySettings: options.safetySettings ?? []
    });

    return this._withRetry(async () => {
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    });
  }

  /**
   * Generate with structured output (JSON)
   */
  async generateJSON(modelName, prompt, options = {}) {
    const text = await this.generate(modelName, prompt, {
      ...options,
      temperature: 0.3, // Lower for more deterministic JSON
    });
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || 
                     text.match(/(\{[\s\S]*\})/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (err) {
      throw new Error(`Failed to parse JSON: ${err.message}`);
    }
  }

  /**
   * Generate with streaming (for long outputs)
   */
  async *generateStream(modelName, prompt, options = {}) {
    const model = this.genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        topK: options.topK ?? 40,
        topP: options.topP ?? 0.95,
      }
    });

    const result = await model.generateContentStream(prompt);
    
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  }

  /**
   * Spawn independent agent (new session)
   */
  async spawnAgent(agentType, prompt, options = {}) {
    const modelName = this._getModelForAgent(agentType);
    const agentId = `${agentType}-${Date.now()}`;
    
    this.activeRequests.set(agentId, {
      type: agentType,
      startTime: Date.now()
    });

    try {
      const result = await this.generate(modelName, prompt, options);
      return result;
    } finally {
      this.activeRequests.delete(agentId);
    }
  }

  /**
   * Spawn multiple agents in parallel
   */
  async spawnAgentsParallel(agentConfigs) {
    const promises = agentConfigs.map(config => 
      this.spawnAgent(config.type, config.prompt, config.options)
    );
    
    return Promise.all(promises);
  }

  /**
   * Get model for agent type
   */
  _getModelForAgent(agentType) {
    const typeMap = {
      'researcher': MODELS.RESEARCH,
      'planner': MODELS.PLANNING,
      'executor': MODELS.EXECUTION,
      'verifier': MODELS.VERIFICATION,
      'debugger': MODELS.DEBUGGING
    };
    
    return typeMap[agentType] || MODELS.PLANNING;
  }

  /**
   * Retry logic with exponential backoff
   */
  async _withRetry(fn) {
    let lastError;
    let delay = RETRY_CONFIG.initialDelay;
    
    for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        
        // Don't retry on non-retryable errors
        if (!this._isRetryable(err)) {
          throw err;
        }
        
        // Don't retry on last attempt
        if (attempt === RETRY_CONFIG.maxRetries) {
          break;
        }
        
        // Wait before retrying
        await this._sleep(delay);
        delay = Math.min(delay * RETRY_CONFIG.backoffMultiplier, RETRY_CONFIG.maxDelay);
      }
    }
    
    throw lastError;
  }

  /**
   * Check if error is retryable
   */
  _isRetryable(err) {
    const retryableCodes = [
      'RATE_LIMIT_EXCEEDED',
      'RESOURCE_EXHAUSTED',
      'UNAVAILABLE',
      'DEADLINE_EXCEEDED'
    ];
    
    const message = err.message.toUpperCase();
    return retryableCodes.some(code => message.includes(code));
  }

  /**
   * Sleep helper
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get active requests info
   */
  getActiveRequests() {
    return Array.from(this.activeRequests.entries()).map(([id, info]) => ({
      id,
      type: info.type,
      duration: Date.now() - info.startTime
    }));
  }
}

// Singleton instance
let clientInstance = null;

export function getGeminiClient() {
  if (!clientInstance) {
    clientInstance = new GeminiClient();
  }
  return clientInstance;
}
