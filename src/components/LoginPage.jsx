import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";
import { useAuth } from "../auth/AuthContext";

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

        await login(email, pw)
        navigate('/');
    }


    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="비밀번호를 입력하세요." value={pw} onChange={(e) => setPw(e.target.value)}/>
                <button type="submit">로그인</button>
            </form>
            <Link to='/register'>회원가입</Link>
        </main>
    )
}

export default LoginPage
