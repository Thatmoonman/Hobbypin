import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom"
import { fetchBoard, getBoard } from "../../../store/board";

const BoardShow = () => {
    const dispatch = useDispatch();
    const { userId, boardId } = useParams();
    const board = useSelector(getBoard(boardId))

    useEffect(() => {
        dispatch(fetchBoard(userId, boardId))
    }, [dispatch, userId, boardId])

    if (!board) return <Redirect to={`/users/${userId}`} />

    return (
        <>
            <h1>{board.title}</h1>
        </>
    )
}

export default BoardShow