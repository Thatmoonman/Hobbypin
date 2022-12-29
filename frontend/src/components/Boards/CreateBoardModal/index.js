import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { createBoard } from '../../../store/board';
import './CreateBoard.css'

const CreateBoard = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const setShowBoardModal = props.setShowBoardModal
    const userId = useSelector(state => state.session.user.id)

    const [title, setTitle] = useState('')
    const [buttonState, setButtonState] = useState(false)

    

    useEffect(() => {
        if (title.length > 0) {
            setButtonState(true)
        } else {
            setButtonState(false)
        }
    }, [title])

    useEffect(() => {
        const button = document.getElementsByClassName("createBoardButton")[0]
        if (buttonState) {
            button.style.backgroundColor = "red"
            button.style.color = "white"
            button.style.cursor = "pointer"
        } else {
            button.style.backgroundColor = "#EFEFEF"
            button.style.color = "rgba(16, 16, 16, 0.3)"
            button.style.cursor = "default"
        }
    }, [buttonState])

    const handleCreateBoard = (e) => {
        e.preventDefault();
        if (!buttonState) return

        const data = {
            title: title,
            userId: userId
        }
        dispatch(createBoard(data))
        setShowBoardModal(false)
        history.push(`/users/${userId}`)
    }

    return (
        <Modal onClose={() => setShowBoardModal(false)}>
            <div className="createBoardModal">
                <h1 className='createBoardHeader'>Create board</h1>
                <form onSubmit={handleCreateBoard} className='createBoardForm'>
                    <label htmlFor='title'>Title</label>
                    <input 
                        id='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Like "Places to go" or "Recipes to make"'
                        autoFocus
                    />
                    <div className='createBoardButtonContainer'>
                        <button className='createBoardButton'>Create</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreateBoard