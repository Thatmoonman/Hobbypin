import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom";
import { fetchUsersPins, getPins } from "../../../store/pins";
import { fetchUser, getUser } from "../../../store/user";
import './UserPinIndex.css'

const UserAllPinsBoard = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const user = useSelector(getUser(userId))
    let pins = useSelector(getPins).filter(pin => pin.uploaderId === parseInt(userId))
    
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
        }
    },[userId])

    if (!currentUser) return <Redirect to="/" />

    return (
        <div >
            <h1 className="pinIndexHeader">All {user.username}'s pins</h1>
            <ul className="userPinIndexColumns">
                {pins.map(pin => (
                <li key={pin.id} className="userPinContainer">
                    <img src={pin.photoUrl} alt=""/>
                    {/* {pin.title} */}
                </li>
                ))}
            </ul>
        </div>  
    )
}

export default UserAllPinsBoard