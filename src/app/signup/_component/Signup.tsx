'use client';

import BackButton from '@/app/_component/BackButton';
import style from './signup.module.css';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import onSubmit from '../_lib/signup';

function getErrorMessage(message: string | null) {
  if (message === 'no_id') {
    return '아이디를 입력하세요';
  }
  if (message === 'no_password') {
    return '비밀번호를 입력하세요.';
  }
  if (message === 'password_mismatch') {
    return '비밀번호가 일치하지 않습니다.';
  }
  if (message === 'user_exists') {
    return '이미 사용중인 아이디입니다.';
  }
  return '';
}

export default function Signup() {
  const router = useRouter();

  const redirectToLogin = () => {
    router.replace('/login');
  };

  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();

  return (
    <div className={style.loginContainer}>
      <div className={style.title}>
        <BackButton />
        <p>회원가입</p>
      </div>
      <form action={formAction} className={style.loginForm}>
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
        <button type='submit' className={style.loginButton} disabled={pending}>
          회원가입
        </button>
        {getErrorMessage(state?.message)}
      </form>
      <div className={style.redirectToLogin}>
        <p>이미 계정이 있으신가요?</p>
        <button onClick={redirectToLogin}>로그인</button>
      </div>
    </div>
  );
}
