'use client';

import { useQuery } from '@tanstack/react-query';
import styles from './main.module.css';
import { getSessions } from '../_lib/getSessions';
import { Session as ISession } from '../model/Session';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/product';
import { signOut, useSession } from 'next-auth/react';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Main() {
  const { data: me } = useSession();
  const { data } = useQuery<ISession[]>({
    queryKey: ['sessions'],
    queryFn: getSessions,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const router = useRouter();
  const productStore = useProductStore();

  const onClickLogout = () => {
    signOut({ redirect: true }).then(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      router.replace('/');
      router.refresh();
    });
  };

  const handleSessionNavigation = (sessionId: string) => {
    if (data) {
      productStore.setProductId(data[0].Chats[0].Product.productId);
      productStore.setProductName(data[0].Chats[0].Product.name);
    }
    router.push(`/chat/${sessionId}`);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <div>
          <h1>ZEROWELL AI</h1>
          {me?.user?.email ? (
            <button onClick={onClickLogout}>로그아웃</button>
          ) : (
            <button onClick={() => router.push('/login')}>로그인</button>
          )}
        </div>
        <p>상품에 대해 궁금한 건 뭐든지 물어보세요</p>
      </div>
      <div className={styles.mainImageDiv}>
        <div className={styles.mainImageBox}>
          <div className={styles.newChatButtonBox}>
            <div>
              <h2>지금 바로 시작해보세요</h2>
              <p>제로웰 AI가 여러분을 기다립니다</p>
            </div>
            <button onClick={() => router.push('/chat')}>대화하기</button>
          </div>
        </div>
      </div>
      <h3>최근 대화</h3>
      <div className={styles.recentContainer}>
        {data?.length !== 0 ? (
          data?.map((session) => (
            <div className={styles.chatSessionCard} key={session.sessionId}>
              <img
                src={`/img/products/${session.Chats[0].Product.productId}.jpg`}
              />
              <div>
                <p className={styles.latestMessage}>
                  {session.Chats[0].content}
                </p>
                <p className={styles.lastMessageTimestamp}>
                  {dayjs(session.Chats[0].createdAt).fromNow(false)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleSessionNavigation(session.sessionId)}
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7 16L13 10L7 4'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='10' cy='4' r='1' fill='white' />
                    <circle cx='10' cy='10' r='1' fill='white' />
                    <circle cx='10' cy='16' r='1' fill='white' />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noSession}>대화 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
