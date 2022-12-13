import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { fetchBoards, getBoards } from "../../../store/board";
import { fetchPin, getPin } from "../../../store/pins";
import { Modal } from "../../../context/Modal";
import './PinShow.css'
import { createPinnedBoard } from "../../../store/pinned_boards";


const PinShowPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { userId, pinId } = useParams();
    const currentUser = useSelector(state => state.session.user)

    const pin = useSelector(getPin(pinId))
    const boards = useSelector(getBoards)

    const windowWidth = document.body.clientWidth
    let pinOrientation = windowWidth > 1100 ? "horizontal" : "vertical"

    const [selectBoard, setSelectBoard] = useState(boards && boards.length ? boards[0] : "")
    const [showSelectBoard, setShowSelectBoard] = useState(false)

    useEffect(() => {
        dispatch(fetchPin(userId, pinId))
        dispatch(fetchBoards(currentUser.id))
    }, [dispatch, userId, pinId, currentUser.id])

    const handleAddBoardClick = (e, board) => {
        e.preventDefault()
        setSelectBoard(board)
        setShowSelectBoard(false)
    }

    const handleSavePin = () => {
        dispatch(createPinnedBoard(pin.id, selectBoard.id))
        history.push(`/users/${currentUser.id}/boards/${selectBoard.id}`)
    }

    const handleAddBoardButton = (e) => {
        e.preventDefault();
        dispatch(createPinnedBoard(pin.id, selectBoard.id))
        history.push(`/users/${currentUser.id}/boards/${selectBoard.id}`)
    }


    const toggleSelectBoardModal = (e, pin) => {
        e.preventDefault();
        showSelectBoard ? setShowSelectBoard(false) : setShowSelectBoard(true)
    }

    return (
        <div className={`pinShowContainer ${pinOrientation}`}>
            <div className="imageContainer">
                <img src={pin.photoUrl} alt=""/>
            </div>
            <div className="pinShowDetails">
                <div className="boardSave">
                    <div onClick={(e) => toggleSelectBoardModal(e, pin)}>
                        {selectBoard.title}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <button className="saveButton" onClick={handleSavePin}>
                        Save
                    </button>
                </div>
                <h1>{pin.title}</h1>
                <p>{pin.description}</p>
            </div>
            {showSelectBoard && 
                <Modal onClose={() => setShowSelectBoard(false)} >
                    <div className="selectBoardForm">
                        {boards.map(board => (
                            <div key={board.id} onClick={(e) => handleAddBoardClick(e, board)}>
                                {board.title}
                                <button className="saveButton" onClick={handleAddBoardButton}>Save</button>
                            </div>
                        ))}
                    </div>
                </Modal>}
        </div>
    )
}

export default PinShowPage