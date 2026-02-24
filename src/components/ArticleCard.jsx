import { useNavigate } from "react-router-dom";
import styles from "./ArticleCard.module.css";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import RenderMath from "../utils/RenderMath";

function ArticleCard(props) {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <article>
        <h2 className={styles.title}>
          <RenderMath text={props.title}/>
        </h2>
        <p className={styles.date}>{props.created_at}</p>
        <ul className={styles.meta}>
          <RenderMath text={props.category}/>
          {props.tags.map(function (tag, index) {
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => navigate(`/search?keyword=${tag}`)}
                >
                  <RenderMath text={tag}/>
                </button>
              </li>
            );
          })}
        </ul>
        <div className={styles.body}>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {props.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

export default ArticleCard;
