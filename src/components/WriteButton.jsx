import { Link } from 'react-router-dom';
import styles from './WriteButton.module.css';

function WriteButton() {
  return (
    <Link to="/write" className={styles.wrapper}>
      <button className={styles.btn}>새 글 쓰기</button>
    </Link>
  );
}

export default WriteButton
