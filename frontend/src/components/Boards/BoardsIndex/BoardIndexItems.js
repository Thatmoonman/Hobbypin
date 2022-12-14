import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBoards, getBoards } from "../../../store/board"
import BoardIndexItem from "./BoardIndexItem"

const BoardIndexItems = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const boards = useSelector(getBoards)

    useEffect(() => {
        dispatch(fetchBoards(userId))
    }, [userId])

    return (
        <>
            {boards.map(board => <BoardIndexItem key={board.id} board={board}/> )}
        </>
    )
}

export default BoardIndexItems