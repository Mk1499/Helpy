import { View, Text } from 'react-native';
import React from 'react';
import axios from 'axios';
import { Message } from '../../screens/Chat/types';
import secrets from '../constants/secrets';

export default function useAIProvider() {
  const MODELS = [
    {
      name: 'OpenAI: GPT OSS',
      code: 'openai/gpt-oss-120b:free',
      logoURL:
        'https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png',
    },

    {
      name: 'NVIDIA: Nemotron 3 Super ',
      code: 'nvidia/nemotron-3-super-120b-a12b:free',
      logoURL:
        'https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png',
    },
  ];

  const openRouterAPI = axios.create({
    baseURL: 'https://openrouter.ai/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secrets.OPEN_ROUTER_API_KEY}`,
    },
    timeout: 60_000,
  });

  async function callAIBotModel(msgs: Message[], modelCode: string) {
    try {
      const res = await openRouterAPI.post('/chat/completions', {
        model: modelCode,
        messages: msgs,
      });
      return {
        response: res.data.choices?.[0].message.content,
      };
    } catch (err) {
      console.log('Error calling AI Bot Model: ', err);
      throw err;
    }
  }

  return {
    MODELS,
    callAIBotModel,
  };
}
