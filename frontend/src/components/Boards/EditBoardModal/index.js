import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBoard, getBoard, updateBoard } from "../../../store/board"
import { Modal } from "../../../context/Modal"
import "./EditBoardModal.css"


const EditBoardModal = (props) => {
    const dispatch = useDispatch();
    const { boardId } = useParams()
    const board = useSelector(getBoard(boardId))
    const setShowEditBoardModal = props.setShowEditBoardModal

    const [title, setTitle] = useState(board.title)
    const [description, setDescription] = useState(board.description ? board.description : '')

    useEffect(() => {
        dispatch(fetchBoard( boardId, board.userId))
    }, [boardId])

    const handleUpdateBoard = (e) => {
        e.preventDefault();
        const data = {
            ...board,
            title: title,
            description: description
        }

        dispatch(updateBoard(data))        
        setShowEditBoardModal(false)
    }

    return (
        <Modal onClose={() => setShowEditBoardModal(false)}>
            <div className='editBoardModal'>
                <div className="editHeaderContainer">
                    <div></div>
                    <h1>Edit your board</h1>
                    <div onClick={() => setShowEditBoardModal(false)}><i className="fa-solid fa-x"></i></div>
                </div>
                <form className='editBoardForm' onSubmit={handleUpdateBoard}>
                    <label htmlFor="title">Title</label>
                    <input 
                        id="title"
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Whats your board about?"
                    />
                    <div className="editFormButtonContainer">
                        <button>Done</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default EditBoardModal