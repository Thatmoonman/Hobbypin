import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { createBoard } from '../../../store/board';
import './CreateBoard.css'

const CreateBoard = (props) => {
    const dispatch = useDispatch();
    const setShowBoardModal = props.setShowBoardModal
    const { userId } = useParams()

    const [title, setTitle] = useState('')

    const handleCreateBoard = (e) => {
        e.preventDefault();
        const data = {
            title: title,
            userId: userId
        }
        const newBoard = dispatch(createBoard(data))
        setShowBoardModal(false)
        console.log(newBoard)
        // return <Redirect to={`/users/${userId}/boards/${newBoard.id}`} />
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
                    />
                    <div className='createBoardButtonContainer'>
                        <button>Create</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreateBoard