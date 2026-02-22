import { useEffect, useState } from "react"
import { Link, useSearchParams } from 'react-router-dom'
import styles from './Nav.module.css'
import { API_URL } from "../config";

function Nav() {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch(`${API_URL}/categories`).then(res => res.json())
        .then(data => setCategories(data))
    }, [])

    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get('category')

    return (
        <nav className={styles.container} >
            {categories.map(category => (
                <Link key={category} to={`/?category=${category}`}>
                    <button className={`${styles.btn}${category === currentCategory ? ` ${styles.active}`:''}`}>{category}</button>
                </Link>
            ))}
        </nav>
    )
}

export default Nav