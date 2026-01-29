import axios, { AxiosError } from 'axios';
import secrets from '../constants/secrets';
import { Message } from '../../screens/Chat/types';

const MODELS = [
  'openai/gpt-4o-mini',
  'google/gemma-7b-it',
  'mistralai/mistral-7b-instruct',
];

export default function useAIProvider() {
  const openRouterApi = axios.create({
    baseURL: 'https://openrouter.ai/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secrets.OPEN_ROUTER_API_KEY}`,
    },
    timeout: 20_000,
  });

  async function callAIBot(msgs: Message[]) {
    let lastError: unknown = null;

    for (const model of MODELS) {
      try {
        const res = await openRouterApi.post('/chat/completions', {
          model,
          messages: msgs,
        });

        return {
          model,
          response: res.data.choices[0].message.content,
        };
      } catch (err) {
        const error = err as AxiosError;
        lastError = error;

        // Rate limit / quota / temporary failure
        if (error.response?.status === 429 || error.response?.status === 503) {
          continue; // try next model
        }

        // Errors لا معنى نكمّل بعدها
        break;
      }
    }

    throw lastError ?? new Error('All AI models failed');
  }

  return { callAIBot };
}
