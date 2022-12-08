import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
        const newBoard = {
            title: title,
            userId: userId
        }
        dispatch(createBoard(newBoard))
    }

    return (
        <Modal onClose={() => setShowBoardModal(false)}>
            <div className="CreateBoardModal">
                <div>CREATE BOARD MODAL</div>
                <form onSubmit={handleCreateBoard}>
                    <label htmlFor='title'>Title</label>
                    <input 
                        id='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </form>
            </div>
        </Modal>
    )
}

export default CreateBoard