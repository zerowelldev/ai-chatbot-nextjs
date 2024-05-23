'use client';

import BackButton from '@/app/_component/BackButton';
import style from './login.module.css';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const findCredentialsBtn = () => {
    alert('서비스 준비중입니다.');
  };
  const redirectToSignup = () => {
    router.replace('/signup');
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await signIn('credentials', {
        username: id,
        password,
        redirect: false,
      });
      if (!response?.ok) {
        setErrorMessage('아이디와 비밀번호가 일치하지 않습니다');
      } else {
        console.log(response);

        // router.replace('/');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  };
  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const onChangePw: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.title}>
        <BackButton />
        <p>로그인</p>
      </div>
      <form onSubmit={onSubmit} className={style.loginForm}>
        <div className={style.idDiv}>
          <label className={style.inputLabel} htmlFor='id'>
            아이디
          </label>
          <input
            type='text'
            id='id'
            value={id}
            onChange={onChangeId}
            placeholder='아이디를 입력해주세요'
          />
        </div>
        <div className={style.passwordDiv}>
          <label className={style.inputLabel} htmlFor='password'>
            비밀번호
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={onChangePw}
            placeholder='비밀번호를 입력해주세요'
          />
        </div>
        <div>
          <button
            className={style.findCredentialsBtn}
            onClick={findCredentialsBtn}
          >
            아이디/비밀번호 찾기
          </button>
        </div>
        <button className={style.loginButton} disabled={!id && !password}>
          로그인
        </button>
        {errorMessage}
      </form>
      <div className={style.redirectToSignup}>
        <p>아직 회원이 아니신가요?</p>
        <button onClick={redirectToSignup}>회원가입</button>
      </div>
    </div>
  );
}
