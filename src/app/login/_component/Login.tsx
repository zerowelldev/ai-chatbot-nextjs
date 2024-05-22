import BackButton from '@/app/_component/BackButton';
import style from './login.module.css';

export default function Login() {
  return (
    <div className={style.loginContainer}>
      <div className={style.loginForm}>
        <div className={style.title}>
          <BackButton />
          <p>로그인</p>
        </div>
        <div className={style.idDiv}>
          <p>아이디</p>
          <input placeholder='아이디를 입력해주세요' />
        </div>
        <div className={style.passwordDiv}>
          <p>비밀번호</p>
          <input placeholder='비밀번호를 입력해주세요' />
        </div>
        <div>
          <button className={style.findCredentialsBtn}>
            아이디/비밀번호 찾기
          </button>
        </div>
        <button className={style.loginButton}>로그인</button>
      </div>
      <div className={style.redirectToSignup}>
        <p>아직 회원이 아니신가요?</p>
        <button>회원가입</button>
      </div>
    </div>
  );
}
