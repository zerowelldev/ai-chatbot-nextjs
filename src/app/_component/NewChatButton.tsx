'use client';

import { useRouter } from 'next/navigation';

export default function NewChatButton() {
  const router = useRouter();

  const navigateToNewChat = () => {
    router.push('/chat');
  };

  return <button onClick={navigateToNewChat}>대화하기</button>;
}
