'use client';

import BackButton from '@/app/_component/BackButton';
import style from './signup.module.css';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const redirectToLogin = () => {
    router.replace('/login');
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginForm}>
        <div className={style.title}>
          <BackButton />
          <p>회원가입</p>
        </div>
        <div className={style.idDiv}>
          <p>아이디</p>
          <input placeholder='아이디를 입력해주세요' />
        </div>
        <div className={style.passwordDiv}>
          <p>비밀번호</p>
          <input placeholder='비밀번호를 입력해주세요' />
        </div>
        <div className={style.passwordCheckDiv}>
          <p>비밀번호 확인</p>
          <input placeholder='비밀번호를 다시 입력해주세요' />
        </div>
        <button className={style.loginButton}>회원가입</button>
      </div>
      <div className={style.redirectToLogin}>
        <p>이미 계정이 있으신가요?</p>
        <button onClick={redirectToLogin}>로그인</button>
      </div>
    </div>
  );
}
