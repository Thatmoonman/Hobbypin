import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchComments, getComments } from "../../../store/comment";
import CommentsIndexItem from "./CommentsIndexItem"

const CommentsIndex = () => {
    const dispatch = useDispatch();
    const {pinId} = useParams();
    const comments = useSelector(getComments)
    
    useEffect(() => {
        dispatch(fetchComments(pinId))
    }, [pinId])

    return (
        <>
            {comments.map(comment => (
                <CommentsIndexItem key={comment.id} comment={comment}/>
            ))}
        </>
    )
}

export default CommentsIndex