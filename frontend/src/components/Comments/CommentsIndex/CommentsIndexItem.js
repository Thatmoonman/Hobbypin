import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, getUser } from "../../../store/user"


const CommentsIndexItem = (props) => {
    const dispatch = useDispatch();
    const comment = props.comment
    const commenterId = comment.commenterId

    const commenter = useSelector(getUser(commenterId))

    useEffect(() => {
        dispatch(fetchUser(commenterId))
    },[commenterId])

    return (
        <div className="commentIndexItem">
            <img src={commenter.profilePic}/>
            <h3>{commenter.username}</h3>
            <p>{comment.text}</p>
        </div>
    )
}

export default CommentsIndexItem