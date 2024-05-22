'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import BackButton from '../../_component/BackButton';
import NewChatButtonIcon from './NewChatButtonIcon';

import styles from './newChat.module.css';
import { useProductStore } from '@/store/product';

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

export default function NewChat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickProductId, setClickProductId] = useState('');

  const router = useRouter();
  const productStore = useProductStore();

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
    productStore.setProductId(productId);
    productStore.setProductName(productName);
  };
  const navigateChatSession = () => {
    let sessionId = uuidv4();
    router.replace(`/chat/${sessionId}`);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <BackButton />
        <button className={styles.selectedProduct} onClick={handleProductModal}>
          상품 선택
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
      <div className={styles.chatContent}>
        <p className={styles.noSelectedProduct}>상품 선택 후 질문해주세요</p>
      </div>
      <div className={styles.inputBox}>
        <input type='text' placeholder='상품 선택 후 질문해주세요' />
        <button>
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
      </div>
    </div>
  );
}
