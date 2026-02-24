import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditPage.module.css";
import { API_URL } from "../config";
import ReactMarkdown from 'react-markdown';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import RenderMath from "../utils/RenderMath";

function EditPage () {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.category);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(", "));
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !content) {
      alert("제목, 카테고리, 본문을 모두 입력하세요.");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    try {
      await fetch(`${API_URL}/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, tags: tagsArray }),
      });
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
    alert("수정 완료");
    navigate("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.layoutWithPreview}>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <p className={styles.preview}>{title ? <RenderMath text={title}/> : <span>미리보기가 여기에 표시됩니다.</span>}</p>
      </div>
        <div className={styles.layoutWithPreview}>
          <input
            className={styles.input}
            type="text"
            list="category-list"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="카테고리 선택 또는 입력"
          />
          <datalist id="category-list">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          <p className={styles.preview}>{category ? <RenderMath text={category}/> : <span>미리보기가 여기에 표시됩니다.</span>}</p>
        </div>
      <div className={styles.layoutWithPreview}>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="본문을 입력하세요"
        ></textarea>
          <div className={styles.previewBody}>
            {" "}
            {content ? (
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <p>
                미리보기가 여기에 표시됩니다.
              </p>
            )}{" "}
          </div>
      </div>
      <div className={styles.layoutWithPreview}>
        <input
          className={styles.input}
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 쉼표로 구분하여 입력하세요"
        />
        <p className={styles.preview}>{tags ? <RenderMath text={tags}/> : <span>미리보기가 여기에 표시됩니다.</span>}</p>
      </div>
      <button className={styles.submit} type="submit">
        저장
      </button>
    </form>
  );
}

export default EditPage;
