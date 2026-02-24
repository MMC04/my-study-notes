import { Link } from "react-router-dom";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import styles from "./ArticlePreview.module.css";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import RenderMath from "../utils/renderMath";

function ArticlePreview({ id, title, content }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link to={`/${id}`} className={styles.titleBtn}>
          <RenderMath text={title}/>
        </Link>
      </h3>
      <div className={styles.excerpt}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {content.slice(0, 100)}
        </ReactMarkdown>
      </div>
      <div className={styles.buttons}>
        <EditButton id={`${id}`} />
        <DeleteButton id={`${id}`} title={`${title}`} />
      </div>
    </article>
  );
}

export default ArticlePreview;
