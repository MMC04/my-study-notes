import { Link } from "react-router-dom";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import styles from './ArticlePreview.module.css';

function ArticlePreview({ id, title, content }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link to={`/${id}`}>
          <button className={styles.titleBtn}>{title}</button>
        </Link>
      </h3>
      <p className={styles.excerpt}>{content.slice(0, 100)}</p>
      <div className={styles.buttons}>
        <EditButton id={`${id}`}/>
        <DeleteButton id={`${id}`} title={`${title}`} />
      </div>
    </article>
  );
}

export default ArticlePreview;
