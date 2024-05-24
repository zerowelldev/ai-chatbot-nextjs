'use client';

import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './chatSession.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Chat } from '@/app/model/Chat';
import ChatLoading from './ChatLoading';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  sessionId: string;
  setResponseReceived: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ChatForm({ sessionId, setResponseReceived }: Props) {
  const [userMessage, setUserMessage] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      setResponseReceived(false);
      let data = {
        userId: 'fd6c215a-55b7-4f83-9f00-e37eac2d560a',
        sessionId,
        productId: 'ZWIM-0151',
        userMessage,
      };

      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    },
    async onSuccess(response, variable) {
      const aiMessage = await response.json();
      setUserMessage('');
      if (queryClient.getQueryData(['session', sessionId])) {
        queryClient.setQueryData(['session', sessionId], (prevData: Chat[]) => {
          const userMessageObj = {
            ...prevData[0],
            type: 'user',
            content: userMessage,
            chatId: uuidv4(),
          };
          const updatedData = [...prevData, userMessageObj, aiMessage];
          setResponseReceived(true);
          return updatedData;
        });
      }
    },
    onError(error) {
      console.error(error);
      alert('답변 중 에러가 발생했습니다. 잠시 후에 다시 시도해보세요. ');
    },
  });

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setUserMessage(e.target.value);
  };

  return (
    <form
      className={`${styles.inputBox} ${userMessage !== '' && styles.isTyping}`}
      onSubmit={mutation.mutate}
    >
      <TextareaAutosize
        placeholder='메시지를 입력해주세요'
        maxRows={5}
        value={userMessage}
        onChange={handleMessageChange}
      />
      {mutation.isPending ? (
        <ChatLoading />
      ) : (
        <button disabled={mutation.isPending || userMessage === ''}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18 10L12 4L6 10'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 4V20'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      )}
    </form>
  );
}
