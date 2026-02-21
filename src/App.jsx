import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from './App.module.css';
import ArticleDetail from "./components/ArticleDetail";
import WritePage from "./components/WritePage";
import MainPage from "./components/MainPage";  // 새로 생성
import SearchResults from "./components/SearchResult";
import EditPage from "./components/EditPage"
import ToMain from "./components/ToMain";

function App() {
  return (
    <BrowserRouter>
      <header className={styles.header}>
        <ToMain />
        <Nav />
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/write/:id" element={<EditPage />} />
        <Route path="/:id" element={<ArticleDetail />} />
        <Route path='/search' element={<SearchResults/>} />
      </Routes>
      <footer className={styles.footer}>Copyright 2026. SHS. All rights reserved.</footer>
    </BrowserRouter>
  );
}

export default App;
