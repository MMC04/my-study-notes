import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import styles from "./LoginPage.module.css";

function LoginPage () {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !pw) {
            alert('Email과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            await login(email, pw);
            navigate('/');
        } catch (err) {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

    }


    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>로그인</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.input} type="email" placeholder="Email을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className={styles.input} type="password" placeholder="비밀번호를 입력하세요." value={pw} onChange={(e) => setPw(e.target.value)}/>
                    <button className={styles.submit} type="submit">로그인</button>
                </form>
                <p className={styles.footer}>
                    계정이 없으신가요? <Link to='/register'>회원가입</Link>
                </p>
            </div>
        </main>
    )
}

export default LoginPage
