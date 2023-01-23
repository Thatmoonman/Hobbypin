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
import UpdatePin from "../UpdatePin";


const PinShowPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { userId, pinId } = useParams();
    const currentUser = useSelector(state => state.session.user)

    const pin = useSelector(getPin(pinId))
    const boards = useSelector(getBoards)

    const windowWidth = document.body.clientWidth
    let pinOrientation = windowWidth > 1100 ? "horizontal" : "vertical"

    const [showSelectBoard, setShowSelectBoard] = useState(false)
    const [showUpdatePin, setShowUpdatePin] = useState(false)

    // const [selectBoard, setSelectBoard] = useState(boards && boards.length ? boards[0] : "")
    // const [saved, setSaved] = useState(false)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchPin(userId, pinId))
        if (currentUser) dispatch(fetchBoards(currentUser.id))
        setLoaded(true)
    }, [userId, pinId])

    const handleAddBoard = (e, board) => {
        e.preventDefault();
        setShowSelectBoard(false)
        dispatch(createPinnedBoard(pin.id, board.id))
        history.push(`/users/${currentUser.id}/boards/${board.id}`)
    }

    const toggleSelectBoardModal = (e) => {
        e.preventDefault();
        showSelectBoard ? setShowSelectBoard(false) : setShowSelectBoard(true)
    }
    
    const toggleUpdatePin = (e) => {
        e.preventDefault();
        showUpdatePin ? setShowUpdatePin(false) : setShowUpdatePin(true)
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
                        {currentUser.id === pin.uploaderId ? (
                            <div className="navIcon" onClick={toggleUpdatePin}><i className="fa-solid fa-pencil"></i></div>
                        ) : (
                            <div></div>
                        )}
                        <button className="saveButton" onClick={toggleSelectBoardModal}>Save</button>
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
                {showUpdatePin &&
                    <Modal onClose={() => setShowUpdatePin(false)}>
                        <UpdatePin pin={pin} setShowUpdatePin={setShowUpdatePin}/>
                    </Modal>
                }
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