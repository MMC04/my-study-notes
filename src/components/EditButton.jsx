import { Link } from "react-router-dom"

function EditButton ({ id }) {
    return (<Link to={`/write/${id}`}><button>수정</button></Link>)
}

export default EditButton