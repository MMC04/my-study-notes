import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Search.module.css'

function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      alert("검색어를 입력하세요");
      return;
    }
    
    // 검색 결과 페이지로 이동
    navigate(`/search?keyword=${keyword}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input 
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색 키워드 입력"
        className={styles.input}
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default Search;