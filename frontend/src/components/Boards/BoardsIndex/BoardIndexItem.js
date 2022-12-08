import { Link } from "react-router-dom"

const BoardIndexItem = (props) => {
    const board = props.board

    

    return (
        
        <Link to={`/users/${board.userId}/boards/${board.id}`} className="boardIdxItem" >
            <p>title: {board.title}</p>
            <p>user: {board.userId}</p>
        </Link>
    )
}

export default BoardIndexItem