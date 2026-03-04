import axios, { AxiosError } from 'axios';
import secrets from '../constants/secrets';
import { Message } from '../../screens/Chat/types';
import { Model } from '../types';

export default function useAIProvider() {
  const MODELS: Model[] = [
    {
      name: 'GPT-4o Mini',
      code: 'openai/gpt-4o-mini',
      logoURL:
        'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/openai.png',
    },
    {
      name: 'Gemma 7B',
      code: 'google/gemma-7b-it',
      logoURL:
        'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/gemma-color.png',
    },
    {
      name: 'Mistral 7B',
      code: 'mistralai/mistral-7b-instruct',
      logoURL:
        'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/mistral-color.png',
    },
  ];

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
          model: model.code,
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

  async function callAIBotModel(msgs: Message[], modelCode: string) {
    try {
      const res = await openRouterApi.post('/chat/completions', {
        model: modelCode,
        messages: msgs,
      });

      return {
        response: res.data.choices[0].message.content,
      };
    } catch (err) {
      const error = err as AxiosError;
      throw error;
    }
  }
  return { callAIBot, callAIBotModel, MODELS };
}
