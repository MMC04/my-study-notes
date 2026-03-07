import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
        <input placeholder="email을 입력하세요." type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="비밀번호를 입력하세요" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <button type="submit">회원가입</button>
    </form>
    )
}

export default RegisterPage