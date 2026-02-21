import { Link, useSearchParams } from "react-router-dom";
import styles from './PageIndex.module.css';

function PageIndex({ totalPages }) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.container}>
      {pages.map((page, index) => (
        <Link key={index} to={`/?page=${page}`}>
          <button className={`${styles.btn}${page === currentPage ? ` ${styles.active}` : ''}`}>
            {page}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default PageIndex;
