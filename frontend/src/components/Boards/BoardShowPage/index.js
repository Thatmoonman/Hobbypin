import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom"
import { fetchBoard, getBoard } from "../../../store/board";
import { fetchBoardPins, getPins } from "../../../store/pins";
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
    const user = useSelector(getUser(userId))
    const pins = useSelector(getPins)

    const [showEditBoardDropdown, setShowEditBoardDropdown] = useState(false)
    const [showEditBoardModal, setShowEditBoardModal] = useState(false)
    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false)
    const [showRemovePinModal, setShowRemovePinModal] = useState(false)

    useEffect(() => {
        dispatch(fetchBoard(userId, boardId))
        dispatch(fetchUser(userId))
        dispatch(fetchBoardPins(boardId))
    }, [dispatch, userId, boardId])

    const toggleBoardShowDropdown = () => {
        showEditBoardDropdown ? setShowEditBoardDropdown(false) : setShowEditBoardDropdown(true)
    }

    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) return <Redirect to="/" />

    return (
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
                <div className="profilePic"><img src={user.profilePic}/></div>
                <p>{board.description}</p>
                {showEditBoardModal && <EditBoardModal setShowEditBoardModal={setShowEditBoardModal}/>}
                {showDeleteBoardModal && <DeleteBoardModal setShowDeleteBoardModal={setShowDeleteBoardModal} />}
                {showRemovePinModal && <RemovePinFromBoardModal pins={pins} setShowRemovePinModal={setShowRemovePinModal} />}
            </div>
            <ul className="boardShowContainer">
                {pins.map(pin => (
                    <PinCard key={pin.id} pin={pin}/>
                ))}
            </ul>
        </div>
    )
}

export default BoardShow