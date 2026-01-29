export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
};
