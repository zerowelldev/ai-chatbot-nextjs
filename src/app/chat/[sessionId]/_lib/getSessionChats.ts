import { Chat } from '@/app/model/Chat';
import { QueryFunction } from '@tanstack/react-query';

export const getSessionChats: QueryFunction<
  Chat[],
  [_1: string, string]
> = async ({ queryKey }) => {
  const [_1, sessionId] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/chat/${sessionId}`,
    {
      next: {
        tags: ['session', sessionId],
      },
      cache: 'no-store',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
