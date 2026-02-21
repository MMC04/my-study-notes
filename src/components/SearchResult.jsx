import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";
import styles from './SearchResult.module.css';
import { API_URL } from "../config";

function SearchResults() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  useEffect(() => {
    if (!keyword) return;

    setIsLoading(true);

    fetch(`${API_URL}/articles/search?keyword=${keyword}`)
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [keyword]);

  if (!keyword) {
    return (
      <main className={styles.container}>
        <p>검색어를 입력하세요</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className={styles.container}>
        <p>검색 중...</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>"{keyword}" 검색 결과</h2>
      <p className={styles.count}>{articles.length}개의 결과</p>

      {articles.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {articles.map(article => (
            <li className={styles.item} key={article.id}>
              <ArticlePreview
                id={article.id}
                title={article.title}
                content={article.content}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default SearchResults;
