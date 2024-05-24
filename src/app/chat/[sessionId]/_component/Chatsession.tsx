'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import BackButton from '@/app/_component/BackButton';
import NewChatButtonIcon from '@/app/chat/_component/NewChatButtonIcon';

import styles from './chatSession.module.css';
import { useQuery } from '@tanstack/react-query';
import { Chat } from '@/app/model/Chat';
import { getSessionChats } from '../_lib/getSessionChats';
import ChatForm from './ChatForm';
import { useProductStore } from '@/store/product';
import { useSession } from 'next-auth/react';

let products = [
  {
    productId: 'ZWAH-700W',
    productName: '자연기화식 가습기',
    imgSrc: '/img/products/ZWAH-700W.jpg',
    activate: false,
  },
  {
    productId: 'ZWAH-800W',
    productName: '대용량 자연기화식 가습기 (IoT)',
    imgSrc: '/img/products/ZWAH-800W.jpg',
    activate: false,
  },
  {
    productId: 'ZWIM-0151',
    productName: '독도꽁꽁 올세척 제빙기',
    imgSrc: '/img/products/ZWIM-0151.jpg',
    activate: true,
  },
  {
    productId: 'ZWA-MC310',
    productName: '베이비세이프 공기청정기',
    imgSrc: '/img/products/ZWA-MC310.jpg',
    activate: false,
  },
];

type Props = {
  sessionId: string;
};
export default function ChatSession({ sessionId }: Props) {
  const { data: me } = useSession();
  const { data } = useQuery<Chat[], object, Chat[], [_1: string, _2: string]>({
    queryKey: ['session', sessionId],
    queryFn: getSessionChats,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const productStore = useProductStore();
  useEffect(() => {
    if (data?.length !== 0) {
      productStore.setProductId(data![0].Product.productId);
      productStore.setProductName(data![0].Product.name);
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickProductId, setClickProductId] = useState('상품 선택');
  const [clickProductName, setClickProductName] = useState('');
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [responseReceived, setResponseReceived] = useState(false);

  const handleProductModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  const handleProductClick = (productId: string, productName: string) => {
    setClickProductId(productId);
    setClickProductName(productName);
    productStore.setProductId(productId);
    productStore.setProductName(productName);
  };
  const navigateChatSession = () => {
    let sessionId = uuidv4();
    router.replace(`/chat/${sessionId}`);
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [responseReceived]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <BackButton />
        <button className={styles.selectedProduct} onClick={handleProductModal}>
          {productStore.productId !== '상품 선택' ? (
            <div>
              <img src={`/img/products/${productStore.productId}.jpg`} />
              <p>{productStore.productName}</p>
            </div>
          ) : (
            <p>{productStore.productName}</p>
          )}
          <svg
            width='8'
            height='6'
            viewBox='0 0 8 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.75593 5.12713C4.35716 5.58759 3.64284 5.58759 3.24407 5.12713L0.23682 1.65465C-0.324056 1.00701 0.135996 8.62339e-07 0.992749 7.87439e-07L7.00725 2.61634e-07C7.864 1.86735e-07 8.32406 1.00701 7.76318 1.65465L4.75593 5.12713Z'
              fill='#767676'
            />
          </svg>
        </button>
        {isModalOpen && (
          <div className={styles.productModal}>
            {products.map((product) => (
              <div
                key={product.productId}
                className={`${styles.productList} ${
                  clickProductId === product.productId
                    ? styles.clickProduct
                    : ''
                }`}
                onClick={() =>
                  handleProductClick(product.productId, product.productName)
                }
              >
                <div>
                  <img src={product.imgSrc} />
                  <p>{product.productName}</p>
                </div>
                {clickProductId === product.productId && (
                  <svg
                    width='18'
                    height='13'
                    viewBox='0 0 18 13'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1 7L6 12L17 1'
                      stroke='black'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                )}
              </div>
            ))}
            <div className={styles.modalButtonBox}>
              <button onClick={closeProductModal}>닫기</button>
              <button onClick={navigateChatSession}>선택완료</button>
            </div>
          </div>
        )}
        <NewChatButtonIcon />
      </div>
      <div className={styles.chatContent} ref={listRef}>
        <p className={styles.noSelectedProduct}>
          안녕하세요 제로웰 독도꽁꽁입니다.
          <br />
          아래 이미지에 버튼을 클릭하시거나
          <br />
          메시지를 입력하여 대화를 시작해보세요
        </p>
        <div className={styles.templateImage}>
          <button>얼음 보관기능이 있나요?</button>
        </div>
        <div className={styles.messageBox}>
          {data?.map((chat) =>
            chat.type === 'user' ? (
              <div className={styles.userMessage} key={chat.chatId}>
                <div>나</div>
                <p>{chat.content}</p>
              </div>
            ) : (
              <div className={styles.aiMessage} key={chat.chatId}>
                <p>제로웰 AI</p>
                <p>{chat.content}</p>
              </div>
            )
          )}
        </div>
      </div>
      <ChatForm
        me={me}
        sessionId={sessionId}
        setResponseReceived={setResponseReceived}
      />
    </div>
  );
}
