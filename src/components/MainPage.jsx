import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import WriteButton from "./WriteButton";
import PageIndex from "./PageIndex";
import ArticlePreview from "./ArticlePreview";
import styles from './MainPage.module.css';

function MainPage() {
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');
  const page = searchParams.get('page') || 1;

  useEffect(() => {
    let url = `http://localhost:3000/articles?page=${page}`;
    if (category) {
      url += `&category=${category}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setTotalPages(data.totalPages);
      });
  }, [category, page, articles]);

  return (
    <main className={styles.container}>
      <Search />
      <ul className={styles.list}>
        {articles.map((article) => (
          <li className={styles.item} key={article.id}>
            <ArticlePreview
              title={article.title}
              content={article.content}
              id={article.id}
            />
          </li>
        ))}
      </ul>
      <WriteButton />
      <PageIndex totalPages={totalPages} />
    </main>
  );
}

export default MainPage
