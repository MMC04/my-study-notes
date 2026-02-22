import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import styles from './ArticleDetail.module.css';
import { API_URL } from "../config";

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/articles/${id}`)
      .then((res) => res.json())
      .then((article) => setArticle(article));
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <article className={styles.wrapper}>
      <ArticleCard
        title={article.title}
        created_at={article.created_at}
        category={article.category}
        tags={article.tags}
        content={article.content}
      />
      <div className={styles.buttons}>
        <EditButton id={article.id}/>
        <DeleteButton id={article.id} title={article.title} />
      </div>
    </article>
  );
}

export default ArticleDetail;
