import { Chat } from './Chat';

export interface Session {
  sessionId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  Chats: Chat[];
}
