import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Modal } from "../../../context/Modal"
import { fetchBoards, getBoards } from "../../../store/board"
import { createPinnedBoard } from "../../../store/pinned_boards"

const PinCard = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { pin } = props
    const boards = useSelector(getBoards)
    const currentUser = useSelector(state => state.session.user)
    
    const [hoverCard, setHoverCard] = useState(false)
    // const [selectBoard, setSelectBoard] = useState(boards && boards.length ? boards[0] : '')
    const [selectPin, setSelectPin] = useState('')
    const [showSelectBoard, setShowSelectBoard] = useState(false)

    useEffect(() => {
        dispatch(fetchBoards(currentUser.id))
    }, [currentUser.id, dispatch])

 

    // const handleSavePin = (pin) => {
    //     setSelectPin(pin)
    //     dispatch(createPinnedBoard(selectPin.id, selectBoard.id))
    // }

    // const handleAddBoardButton = (e, board) => {
    //     e.preventDefault();
    //     e.stopPropogation()
    //     dispatch(createPinnedBoard(selectPin.id, board.id))
    //     setShowSelectBoard(false)
    // }

    const handleAddBoard = (e, board) => {
        e.preventDefault()
        setShowSelectBoard(false)
        dispatch(createPinnedBoard(selectPin.id, board.id))
        history.push(`/users/${board.uploaderId}/boards/${board.id}`)
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
                        {/* <div onClick={(e) => toggleSelectBoardModal(e, pin)} className="showSelectBoard">
                            <p>My boards</p>
                            <i className="fa-solid fa-chevron-down" />
                        </div> */}
                        <div></div>
                        <button
                            className="saveButton"
                            onClick={(e) => toggleSelectBoardModal(e, pin)}
                            onMouseEnter={() => setHoverCard(true)}>
                            Save
                        </button>
                    </Link>
            }
            <img src={pin.photoUrl} className="pinPhoto" alt=""/>
            {showSelectBoard && 
                <Modal onClose={() => setShowSelectBoard(false)} >
                    <div className="selectBoardForm">
                        {/* <p>All boards</p> */}
                        {boards.map(board => (
                            <div key={board.id} onClick={(e) => handleAddBoard(e, board)}>
                                {board.title}
                                <button className="saveButton" onClick={(e) => handleAddBoard(e, board)}>Save</button>
                            </div>
                        ))}
                    </div>
                </Modal>}
        </li>
    )
}

export default PinCard