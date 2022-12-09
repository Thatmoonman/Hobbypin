import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { deleteBoard } from "../../../store/board";
import './DeleteBoardModal.css'


const DeleteBoardModal = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { userId, boardId } = useParams();
    
    const setShowDeleteBoardModal = props.setShowDeleteBoardModal

    const handleDeleteBoard = (e) => {
        e.preventDefault();
        dispatch(deleteBoard(boardId))
        setShowDeleteBoardModal(false)
        history.replace(`/users/${userId}`)
    }

    return (
        <Modal onClose={() => setShowDeleteBoardModal(false)}>
            <div className="deleteBoardModal">
                <h1>Are you sure?</h1>
                <p>Once you delete a board, you can't undo it!</p>
                <div className="deleteBoardButtons">
                    <button className="cancelButton" onClick={() => setShowDeleteBoardModal(false)}>Cancel</button>
                    <button className="deleteButton" onClick={handleDeleteBoard}>Delete forever</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteBoardModal