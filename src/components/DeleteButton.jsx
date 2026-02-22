import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

function DeleteButton({ title, id }) {
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirm(`${title} 글을 정말 삭제하시겠습니까?`)) {
      try {
        await fetch(`${API_URL}/articles/${id}`, {
          method: "DELETE",
        });
        navigate("/");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  }

  return (<Link><button onClick={handleDelete}>삭제</button></Link>);
}

export default DeleteButton;
