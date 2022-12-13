import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Modal } from "../../../context/Modal"
import { createPinnedBoard } from "../../../store/pinned_boards"

const PinCard = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { pin, boards} = props
 
    const [hoverCard, setHoverCard] = useState(false)
    const [selectBoard, setSelectBoard] = useState(boards && boards.length ? boards[0] : '')
    const [selectPin, setSelectPin] = useState('')
    const [showSelectBoard, setShowSelectBoard] = useState(false)
    
    const handleAddBoardClick = (e, board) => {
        e.preventDefault()
        setSelectBoard(board)
        setShowSelectBoard(false)
    }

    const handleSavePin = (pin) => {
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
        <li key={pin.id} className="pinCard" 
            onMouseOver={() => setHoverCard(true)} 
            style={{backgroundImage: `url(${pin.photoUrl})`}}>
            {hoverCard &&
                    <Link to={`/users/${pin.uploaderId}/pins/${pin.id}`} 
                        className="pinDetails" 
                        onMouseEnter={() => setHoverCard(true)}
                        onMouseOut={() => setHoverCard(false)}>
                        <div onClick={(e) => toggleSelectBoardModal(e, pin)} className="showSelectBoard">
                            {selectBoard.title}
                            <i className="fa-solid fa-chevron-down" />
                        </div>
                        <button
                            className="saveButton"
                            onClick={(e) => handleSavePin(e, pin)}
                            onMouseEnter={() => setHoverCard(true)}>
                            Save
                        </button>
                    </Link>
            }
            <img src={pin.photoUrl} className="pinPhoto" alt=""/>
            {showSelectBoard && 
                <Modal onClose={() => setShowSelectBoard(false)} >
                    <div className="selectBoardForm">
                        <p>All boards</p>
                        {boards.map(board => (
                            <div key={board.id} onClick={(e) => handleAddBoardClick(e, board)}>
                                {board.title}
                                <button className="saveButton" onClick={handleAddBoardButton}>Save</button>
                            </div>
                        ))}
                    </div>
                </Modal>}
        </li>
    )
}

export default PinCard