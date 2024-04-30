'use client';

import { useRouter } from 'next/navigation';

export default function NewChatButtonIcon() {
  const router = useRouter();

  const navigateToNewChat = () => {
    router.replace('/chat');
  };

  return (
    <button style={{ marginRight: 6 }} onClick={navigateToNewChat}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect x='9' y='2' width='2' height='16' rx='1' fill='black' />
        <rect
          x='18'
          y='9'
          width='2'
          height='16'
          rx='1'
          transform='rotate(90 18 9)'
          fill='black'
        />
      </svg>
    </button>
  );
}
