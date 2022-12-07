import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchBoard, getBoard } from "../../../store/board";

const BoardShow = () => {
    const dispatch = useDispatch();
    const { userId, boardId } = useParams();
    const board = useSelector(getBoard(boardId))
    console.log(board)

    useEffect(() => {
        dispatch(fetchBoard(userId, boardId))
    }, [boardId])

    return (
        <>
            <h1>{board.title}</h1>
        </>
    )
}

export default BoardShow