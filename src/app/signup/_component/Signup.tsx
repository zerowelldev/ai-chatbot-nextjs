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
      <form className={style.loginForm}>
        <div className={style.title}>
          <BackButton />
          <p>회원가입</p>
        </div>
        <div className={style.idDiv}>
          <label className={style.inputLabel} htmlFor='id'>
            아이디
          </label>
          <input
            id='id'
            name='id'
            type='text'
            placeholder='아이디를 입력해주세요'
            required
          />
        </div>
        <div className={style.passwordDiv}>
          <label className={style.inputLabel} htmlFor='password'>
            비밀번호
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            required
          />
        </div>
        <div className={style.passwordCheckDiv}>
          <label className={style.inputLabel} htmlFor='passwordConfirm'>
            비밀번호 확인
          </label>
          <input
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            placeholder='비밀번호를 다시 입력해주세요'
            required
          />
        </div>
        <button type='submit' className={style.loginButton}>
          회원가입
        </button>
      </form>
      <div className={style.redirectToLogin}>
        <p>이미 계정이 있으신가요?</p>
        <button onClick={redirectToLogin}>로그인</button>
      </div>
    </div>
  );
}
