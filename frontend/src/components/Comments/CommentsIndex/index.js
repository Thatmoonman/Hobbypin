import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchComments, getComments, deleteComment } from "../../../store/comment";
import CommentsIndexItem from "./CommentsIndexItem"
import "./Comments.css"

const CommentsIndex = (props) => {
    const dispatch = useDispatch();
    const {pinId} = useParams();
    const comments = useSelector(getComments)
    const currentUserId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(fetchComments(pinId))
    }, [pinId])


    const handleDeleteComment = (e, comment) => {
        e.preventDefault();
        dispatch(deleteComment(comment.id))
    }

    return (
        <div className="commentBox">
            {comments.map(comment => (
                <div className="commentItemContainer" key={comment.id}>
                    <CommentsIndexItem  comment={comment}/>
                    {currentUserId === comment.commenterId && <button onClick={(e) => handleDeleteComment(e, comment)}><i className="fa-solid fa-trash"></i></button>}
                </div>
            ))}
        </div>
    )
}

export default CommentsIndex