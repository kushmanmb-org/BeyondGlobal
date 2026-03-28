/**
 * GitHub AI Inference Chat Client
 * Demonstrates integration with GitHub's AI models via the OpenAI SDK.
 * Equivalent to the C# implementation using OpenAI.Chat.ChatClient.
 *
 * Requires the GITHUB_TOKEN environment variable to be set.
 */

const { OpenAI } = require('openai');

const endpoint = 'https://models.github.ai/inference';
const token = process.env.GITHUB_TOKEN;
const model = 'openai/gpt-4.1';

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'What is the capital of France?' },
];

const requestOptions = {
  model,
  messages,
  temperature: 1.0,
  top_p: 1.0,
};

/**
 * Sends a chat completion request to the GitHub AI inference endpoint
 * and prints the assistant's response.
 */
async function runChat() {
  const response = await client.chat.completions.create(requestOptions);
  const choice = response.choices && response.choices[0];
  if (!choice) {
    throw new Error('No response choices returned from the API.');
  }
  console.log(choice.message.content);
}

// Export for use in other modules
module.exports = { client, messages, requestOptions, runChat };

// CLI execution support
if (require.main === module) {
  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable is not set.');
    process.exit(1);
  }

  runChat().catch((error) => {
    console.error('Chat request failed:', error.message);
    process.exit(1);
  });
}
