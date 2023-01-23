import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom";
import { fetchBoards, getBoards } from "../../../store/board";
import { fetchUsersPins, getPins } from "../../../store/pins";
import { fetchUser, getUser } from "../../../store/user";
import PinCard from "../AllPinsIndex/PinCard";
import './UserPinIndex.css'

const UserAllPinsBoard = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { userId } = useParams()
    const user = useSelector(getUser(userId))
    let pins = useSelector(getPins).filter(pin => pin.uploaderId === parseInt(userId))
    const boards = useSelector(getBoards)
    
    const currentUser = useSelector(state => state.session.user)

    // const window = document.body
    // const [windowWidth, setWindowWidth] = useState(window.clientWidth)
    
    // useEffect(() => {
    //     setWindowWidth(window.clientWidth)
    // }, [window.clientWidth])

    // window.addEventListener( 'resize', (e) => setWindowWidth(e.clientWidth))

    // const columnNumber = () => {
        
    //     if (windowWidth > 1300) {
    //         return 5
    //     } else if (windowWidth < 1300 && windowWidth > 1000) {
    //         return 4
    //     } else {
    //         return 3
    //     }
    // }
    // const columnLength = Math.ceil(pins.length / columnNumber())
    
    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUsersPins(userId))
            dispatch(fetchUser(userId))
            dispatch(fetchBoards(userId))
        }
    },[userId])

    
    if (!currentUser) return <Redirect to="/" />
    
    // const handleClickPin = (pinId) => {
    //     history.push(`/users/${userId}/pins/${pinId}`)
    // }

    return (
        <div >
            <h1 className="pinIndexHeader">All {user.username}'s pins</h1>
            <ul className="userPinIndexColumns">
                {pins.map(pin => (
                    <PinCard key={pin.id} pin={pin} boards={boards} /> 
                // <li key={pin.id} className="userPinContainer" onClick={() => handleClickPin(pin.id)}>
                //     <img src={pin.photoUrl} alt=""/>
                // </li>
                ))}
            </ul>
        </div>  
    )
}

export default UserAllPinsBoard