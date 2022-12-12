import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchBoards, getBoards } from "../../../store/board"


const PinCard = ({pin}) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)
    const boards = useSelector(getBoards)

    const [hoverCard, setHoverCard] = useState(false)
    const [board, setBoard] = useState('')


    useEffect(() => {
        dispatch(fetchBoards(userId))
    }, [userId])

    return (
        <li key={pin.id} className="pinCard" 
            onMouseOver={() => setHoverCard(true)} 
            style={{backgroundImage: `url(${pin.photoUrl})`}}>
            {hoverCard &&
                    <Link to={`/users/${pin.uploaderId}/pins/${pin.id}`} 
                        className="pinDetails" 
                        onMouseEnter={() => setHoverCard(true)}
                        onMouseOut={() => setHoverCard(false)}>
                        <button
                            onMouseEnter={() => setHoverCard(true)}>
                            Save
                        </button>
                    </Link>
            }
            <img src={pin.photoUrl} className="pinPhoto" />
        </li>
    )
}

export default PinCard