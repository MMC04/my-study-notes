import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from './App.module.css';
import ArticleDetail from "./components/ArticleDetail";
import WritePage from "./components/WritePage";
import MainPage from "./components/MainPage";  
import SearchResults from "./components/SearchResult";
import EditPage from "./components/EditPage"
import ToMain from "./components/ToMain";
import LoginPage from "./components/LoginPage";
import { useAuth } from "./auth/AuthContext";
import RegisterPage from "./components/RegisterPage";

function App() {
  const { user, isAuthLoading, logout } = useAuth();
  
  if (isAuthLoading) {
    return <p>로그인 정보 불러오는 중...</p>
  }

  return (
    <BrowserRouter>
      <header className={styles.header}>
        <ToMain />
        <Nav />
        {!user
          ? <Link to='/login' className={styles.authBtn}>로그인</Link>
          : <button className={styles.authBtn} onClick={logout}>로그아웃</button>
        }
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/write/:id" element={<EditPage />} />
        <Route path="/:id" element={<ArticleDetail />} />
        <Route path='/search' element={<SearchResults/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <footer className={styles.footer}>Copyright 2026. SHS. All rights reserved.</footer>
    </BrowserRouter>
  );
}

export default App;
