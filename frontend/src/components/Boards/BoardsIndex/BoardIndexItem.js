import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchBoardPins, getPins } from "../../../store/pins"
import { getUser } from "../../../store/user"

const BoardIndexItem = (props) => { 
    const dispatch = useDispatch()
    
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    
    const board = props.board
    const pins = useSelector(getPins)

    const [pinLength, setPinLength] = useState(pins ? pins.length : 0)

    const [coverPhoto, setCoverPhoto] = useState(pins.length ? pins[0].photoUrl : user.profilePic)

    useEffect(() => {
        dispatch(fetchBoardPins(board.id))
        if (pins.length) {
            setCoverPhoto(pins[0].photoUrl)
            setPinLength(pins.length)
        }
    }, [board.id])

    return (
        
        <Link to={`/users/${board.userId}/boards/${board.id}`} className="boardIdxItem">
            <img src={coverPhoto ? coverPhoto : user.profilePic} alt=""/>
            <h2>{board.title}</h2>
            <p>{pinLength} pins</p>
        </Link>
    )
}

export default BoardIndexItem