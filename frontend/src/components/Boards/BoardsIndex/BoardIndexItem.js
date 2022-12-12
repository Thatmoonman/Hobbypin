import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchBoardPins, getPins } from "../../../store/pins"
import { getUser } from "../../../store/user"

const BoardIndexItem = (props) => { 
    const dispatch = useDispatch()
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    const board = props.board
    const pins = useSelector(getPins)
    

    useEffect(() => {
        dispatch(fetchBoardPins(board.id))
    }, [board.id])

    return (
        
        <Link to={`/users/${board.userId}/boards/${board.id}`} className="boardIdxItem">
            <img src={user.profilePic} />
            <p>title: {board.title}</p>
            <p>user: {board.userId}</p>
        </Link>
    )
}

export default BoardIndexItem