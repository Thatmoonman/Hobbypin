import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { fetchBoards, getBoards } from "../../../store/board";
import { fetchPin, getPin } from "../../../store/pins";
import { Modal } from "../../../context/Modal";
import './PinShow.css'
import { createPinnedBoard } from "../../../store/pinned_boards";
import CommentsIndex from "../../Comments/CommentsIndex";
import CreateCommentForm from "../../Comments/CommentCreate";


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
    const [saved, setSaved] = useState(false)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchPin(userId, pinId))
        if (currentUser) dispatch(fetchBoards(currentUser.id))
        setLoaded(true)
    }, [userId, pinId])

    // const handleAddBoardClick = (e, board) => {
    //     e.preventDefault()
    //     setSelectBoard(board)
    //     setShowSelectBoard(false)
    //     handleSavePin()
    // }

    // const handleSavePin = () => {
    //     dispatch(createPinnedBoard(pin.id, selectBoard.id))
    //     setSaved(true)
        // history.push(`/users/${currentUser.id}/boards/${selectBoard.id}`)
    // }

    const handleAddBoard = (e) => {
        e.preventDefault();
        setShowSelectBoard(false)
        dispatch(createPinnedBoard(pin.id, selectBoard.id))
        history.push(`/users/${currentUser.id}/boards/${selectBoard.id}`)
    }

    const toggleSelectBoardModal = (e) => {
        e.preventDefault();
        showSelectBoard ? setShowSelectBoard(false) : setShowSelectBoard(true)
    }

    if (!currentUser) return <Redirect to="/" />

    const loadPin = () => {
            
        if (loaded && !pin.id) {
            return (
                <div className="notAvailable">
                    <p>Pin does not exist.</p>
                    <Link to="/" className="notAvailableLink">Return to Home</Link>
                </div>

            )
        } else {
            return (
                <div className="loadingUser">
                    {/* <p>Loading Pin</p> */}
                </div>
            )
        }   
    }


    return (
        <>
        {loaded && pin.id ? (
            <div className={`pinShowContainer ${pinOrientation}`}>
                <div className="imageContainer">
                    <img src={pin.photoUrl} alt=""/>
                </div>
                <div className="pinShowDetails">
                    <div className="boardSave">
                        <div onClick={toggleSelectBoardModal}>
                            {selectBoard.title}
                            <i className="fa-solid fa-chevron-down" />
                        </div>
                        {saved ? (
                            <button className="saveButton" style={{"backgroundColor": "black", "color": "white"}}>
                                Saved
                            </button>
                        ) : (
                            <button className="saveButton" onClick={toggleSelectBoardModal}>
                                Save
                            </button>
                        )}
                    </div>
                    <h1>{pin.title}</h1>
                    <p>{pin.description}</p>
                    <CommentsIndex />
                    <CreateCommentForm currentUser={currentUser}/>
                </div>
                {showSelectBoard && 
                    <Modal onClose={() => setShowSelectBoard(false)} >
                        <div className="selectBoardForm">
                            {boards.map(board => (
                                <div key={board.id} onClick={(e) => handleAddBoard(e, board)}>
                                    {board.title}
                                    <button className="saveButton" onClick={(e) => handleAddBoard(e, board)}>Save</button>
                                </div>
                            ))}
                        </div>
                    </Modal>}
            </div>
        ) : (
            <>
                {loadPin()}
            </>
        )}
        </>
    )
}

export default PinShowPage