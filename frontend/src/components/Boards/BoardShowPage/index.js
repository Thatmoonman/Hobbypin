import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom"
import { fetchBoard, getBoard } from "../../../store/board";
import { fetchUser, getUser } from "../../../store/user";
import './BoardShow.css'
import EditBoardDropdown from "./EditBoardDropdown";

const BoardShow = () => {
    const dispatch = useDispatch();
    const { userId, boardId } = useParams();
    const board = useSelector(getBoard(boardId))
    const user = useSelector(getUser(userId))
    const [showEditBoardDropdown, setShowEditBoardDropdown] = useState(false)

    useEffect(() => {
        dispatch(fetchBoard(userId, boardId))
        dispatch(fetchUser(userId))
    }, [dispatch, userId, boardId])

    if (!board) return <Redirect to={`/users/${userId}`} />

    const toggleBoardShowDropdown = () => {
        showEditBoardDropdown ? setShowEditBoardDropdown(false) : setShowEditBoardDropdown(true)
    }

    return (
        <div className="boardShowPage">
            <div className="boardInfo">
                <div className="boardHeader">
                    <h1>{board.title}</h1>
                    <button onClick={toggleBoardShowDropdown}>
                        <i className="fa-solid fa-ellipsis"></i>
                        {showEditBoardDropdown && <EditBoardDropdown setShowEditBoardDropdown={setShowEditBoardDropdown}/> }
                    </button>
                </div>
               
                <div className="profilePic"><i className="fa-solid fa-person"></i></div>
            </div>
        </div>
    )
}

export default BoardShow