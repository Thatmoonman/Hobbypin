import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchPinBoards, getBoards } from "../../../store/board";
import { fetchPin, getPin } from "../../../store/pins";
import { Modal } from "../../../context/Modal";
import './PinShow.css'
import { createPinnedBoard } from "../../../store/pinned_boards";


const PinShowPage = () => {
    const dispatch = useDispatch();
    const { userId, pinId } = useParams();

    const pin = useSelector(getPin(pinId))
    const boards = useSelector(getBoards)

    const windowWidth = document.body.clientWidth
    let pinOrientation = windowWidth > 1100 ? "horizontal" : "vertical"

    const [selectBoard, setSelectBoard] = useState(boards && boards.length ? boards[0] : '')
    const [selectPin, setSelectPin] = useState('')
    const [showSelectBoard, setShowSelectBoard] = useState(false)
    

    useEffect(() => {
        dispatch(fetchPin(userId, pinId))
        dispatch(fetchPinBoards(pinId))
    }, [pinId])

    const handleAddBoardClick = (e, board) => {
        e.preventDefault()
        setSelectBoard(board)
        setShowSelectBoard(false)
    }

    const handleSavePin = (e, pin) => {
        setSelectPin(pin)
        dispatch(createPinnedBoard(selectPin.id, selectBoard.id))
    }

    const handleAddBoardButton = (e) => {
        e.preventDefault();
        dispatch(createPinnedBoard(selectPin.id, selectBoard.id))
    }



    const toggleSelectBoardModal = (e, pin) => {
        e.preventDefault();
        setSelectPin(pin)
        showSelectBoard ? setShowSelectBoard(false) : setShowSelectBoard(true)
    }

    return (
        <div className={`pinShowContainer ${pinOrientation}`}>
            <img src={pin.photoUrl} />
            <div className="pinShowDetails">
                <div className="boardSave">
                    <div onClick={(e) => toggleSelectBoardModal(e, pin)}>
                        {selectBoard.title}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <button className="saveButton" onClick={(e) => handleSavePin(e, pin)}>
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