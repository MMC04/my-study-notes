import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

function Nav() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/categories').then(res => res.json())
        .then(data => setCategories(data))
    }, [categories])

    return (
        <nav className={styles.container} >
            {categories.map(category => (
                <Link key={category} to={`/?category=${category}`}>
                    <button>{category}</button>
                </Link>
            ))}
        </nav>
    )
}

export default Nav