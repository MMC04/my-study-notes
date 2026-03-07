import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";
import { useState } from "react";
import styles from "./RegisterPage.module.css";

function RegisterPage () {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !pw) {
            alert("email과 비밀번호를 모두 입력하세요.");
            return;
        }

        await fetch (`${API_URL}/register`, {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({email, pw}),
        })

        navigate('/');
        
    }

    return (
    <main className={styles.container}>
        <div className={styles.card}>
            <h1 className={styles.title}>회원가입</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} placeholder="Email을 입력하세요." type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.input} placeholder="비밀번호를 입력하세요." type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                <button className={styles.submit} type="submit">회원가입</button>
            </form>
            <p className={styles.footer}>
                이미 계정이 있으신가요? <Link to='/login'>로그인</Link>
            </p>
        </div>
    </main>
    )
}

export default RegisterPage