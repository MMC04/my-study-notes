import { Link } from 'react-router-dom'
import styles from './ToMain.module.css'

function ToMain () {
    return (
        <h3 className={styles.container}>
            <Link to="..\"><button>나의 정리노트</button></Link>
        </h3>
    )
}

export default ToMain