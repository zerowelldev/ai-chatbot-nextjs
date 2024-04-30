'use client';

import { useEffect, useState } from 'react';
import styles from './chatLoading.module.css';

export default function ChatLoading() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const progress = setInterval(() => {
      if (number === 100) {
        clearInterval(progress);
      } else {
        setNumber((prevNumber) => prevNumber + 1);
      }
    }, 200);
    return () => clearInterval(progress);
  }, [number]);

  return (
    <div className={styles.loadingDiv}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.number}>{number}%</div>
        </div>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        width='48px'
        height='48px'
      >
        <defs>
          <linearGradient id='GradientColor'>
            <stop offset='0%' stopColor='#e0c3fc' />
            <stop offset='100%' stopColor='#8ec5fc' />
          </linearGradient>
        </defs>
        <circle cx='24' cy='24' r='21' strokeLinecap='round' />
      </svg>
    </div>
  );
}
