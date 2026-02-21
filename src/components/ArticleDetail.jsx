import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import styles from './ArticleDetail.module.css';

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/articles/${id}`)
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
      <EditButton id={article.id}/>
      <DeleteButton id={article.id} title={article.title} />
    </article>
  );
}

export default ArticleDetail;
