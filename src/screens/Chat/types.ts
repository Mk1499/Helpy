export type Model = {
  name: string;
  code: string;
  logoURL: string;
};

export enum MessageRole {
  User = 'user',
  Assistant = 'assistant',
  System = 'system',
}

export type Message = {
  id: string;
  content: string;
  timestamp: number;
  role: MessageRole;
};
