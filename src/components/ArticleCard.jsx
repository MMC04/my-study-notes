import { useNavigate } from "react-router-dom";
import styles from './ArticleCard.module.css';

function ArticleCard(props) {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <article>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.date}>{props.created_at}</p>
        <ul className={styles.meta}>
          {props.category}
          {props.tags.map(function (tag, index) {
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => navigate(`/search?keyword=${tag}`)}
                >
                  {tag}
                </button>
              </li>
            );
          })}
        </ul>
        <p className={styles.body}>{props.content}</p>
      </article>
    </main>
  );
}

export default ArticleCard;
