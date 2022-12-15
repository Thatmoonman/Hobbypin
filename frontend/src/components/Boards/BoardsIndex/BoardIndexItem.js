import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchBoardPins, getPins } from "../../../store/pins"
import { getUser } from "../../../store/user"

const BoardIndexItem = (props) => { 
    
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    
    const board = props.board

    return (
        
        <Link to={`/users/${board.userId}/boards/${board.id}`} className="boardIdxItem">
            <img src={board.coverPhoto ? board.coverPhoto : user.profilePic} alt=""/>
            <h2>{board.title}</h2>
            <p>{board.length} pins</p>
        </Link>
    )
}

export default BoardIndexItem