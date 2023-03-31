import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom"
import { fetchBoard, fetchBoards, getBoard, getBoards } from "../../../store/board";
import { fetchAllPins, fetchBoardPins, getPins } from "../../../store/pins";
import { fetchUser, getUser } from "../../../store/user";
import PinCard from "../../Pins/AllPinsIndex/PinCard";
import DeleteBoardModal from "../DeleteBoardModal";
import EditBoardModal from "../EditBoardModal";
import RemovePinFromBoardModal from "../RemovePinFromBoardModal";
import './BoardShow.css'
import EditBoardDropdown from "./EditBoardDropdown";

const BoardShow = () => {
    const dispatch = useDispatch();
    const { userId, boardId } = useParams();
    const board = useSelector(getBoard(boardId))
    const boards = useSelector(getBoards)
    const user = useSelector(getUser(userId))
    const pins = useSelector(getPins)
    
    let displayPins = pins.filter(pin => pin.boards.includes(parseInt(boardId)))
    
    const [showEditBoardDropdown, setShowEditBoardDropdown] = useState(false)
    const [showEditBoardModal, setShowEditBoardModal] = useState(false)
    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false)
    const [showRemovePinModal, setShowRemovePinModal] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchBoard(userId, boardId))
            dispatch(fetchUser(userId))
            dispatch(fetchBoards(userId))
            dispatch(fetchAllPins())
            setLoaded(true)
        }
    }, [dispatch, userId, boardId])

    const toggleBoardShowDropdown = () => {
        showEditBoardDropdown ? setShowEditBoardDropdown(false) : setShowEditBoardDropdown(true)
    }

    if (!currentUser) return <Redirect to="/" />
    // if (!board.id) return <Redirect to="/" />

    const loadBoard = () => {
            
        if (loaded) {
            return (
                <div className="notAvailable">
                    <p>Board does not exist.</p>
                    <Link to="/" className="notAvailableLink">Return to Home</Link>
                </div>

            )
        } else {
            return (
                <div className="loadingUser">
                    {/* <p>Loading User</p> */}
                </div>
            )
        }   
    }

    return (
        <>
        {board.id && loaded ? (
            <div className="boardShowPage">
                <div className="boardInfo">
                    <div className="boardHeader">
                        <h1>{board.title}</h1>
                        <button onClick={toggleBoardShowDropdown}>
                            <i className="fa-solid fa-ellipsis"></i>
                            {showEditBoardDropdown && <EditBoardDropdown 
                                showEditBoardDropdown={showEditBoardDropdown}
                                setShowEditBoardDropdown={setShowEditBoardDropdown}
                                setShowEditBoardModal={setShowEditBoardModal}
                                setShowDeleteBoardModal={setShowDeleteBoardModal}
                                setShowRemovePinModal={setShowRemovePinModal}
                            />}
                        </button>
                    </div>
                    <div className="profilePic"><img src={user.profilePic} alt={user.username}/></div>
                    <p>{board.description}</p>
                    {showEditBoardModal && <EditBoardModal setShowEditBoardModal={setShowEditBoardModal}/>}
                    {showDeleteBoardModal && <DeleteBoardModal setShowDeleteBoardModal={setShowDeleteBoardModal} />}
                    {showRemovePinModal && <RemovePinFromBoardModal pins={displayPins} setShowRemovePinModal={setShowRemovePinModal} />}
                </div>
                <div className="boardShowOuterContainer">
                    <ul className="boardShowContainer">
                        {displayPins.map(pin => (
                            <PinCard key={pin.id} pin={pin} boards={boards}/>
                        ))}
                    </ul>
                </div>
                
            </div>
        ) : (
            <>
            {loadBoard()}
            </>
        )}
        </>
    )
}

export default BoardShow