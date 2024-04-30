import { Product } from './Product';

export interface Chat {
  chatId: string;
  type: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  sessionId: string;
  Product: Product;
}
