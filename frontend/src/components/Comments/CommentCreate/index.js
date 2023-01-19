import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { createComment } from '../../../store/comment';
import './CreateComment.css'

const CreateCommentForm = (props) => {
    const dispatch = useDispatch();
    const {pinId} = useParams();
    const currentUser = props.currentUser

    const [commentText, setCommentText] = useState('')

    const handleSubmit = (e) => { 
        e.preventDefault();
        if (commentText.length < 5) return null;
    
        const comment = {
            text: commentText,
            commenterId: currentUser.id,
            pinId: pinId
        }
        dispatch(createComment(comment))
        setCommentText("")
    }

    return (
        <div className="createCommentForm">
            <img src={currentUser.profilePic} alt=""/>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='commentBubble'>
                    <input 
                        type='text'
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    {commentText.length > 4 ? (
                        <button className='createButton'><i className="fa-solid fa-paper-plane"></i></button>
                    ) : (
                        <button className='createButton disabledButton' disabled><i className="fa-solid fa-paper-plane"></i></button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CreateCommentForm