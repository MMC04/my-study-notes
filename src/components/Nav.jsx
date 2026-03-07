import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";
import { API_URL } from "../config";
import RenderMath from "../utils/RenderMath";

function Nav() {
  const [categories, setCategories] = useState([]);

  const location = useLocation();

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [location.key]);

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav className={styles.container}>
      {categories.map((category) => (
        <Link key={category} to={`/?category=${category}`}>
          <button
            className={`${styles.btn}${category === currentCategory ? ` ${styles.active}` : ""}`}
          >
            <RenderMath text={category}/>
          </button>
        </Link>
      ))} 
    </nav>
  );
}

export default Nav;
