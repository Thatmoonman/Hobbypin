import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom";
import { fetchUsersPins, getPins } from "../../../store/pins";
import './UserPinIndex.css'

const UserAllPinsBoard = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    const { userId } = useParams()

    const window = document.body
    const [windowWidth, setWindowWidth] = useState(window.clientWidth)
    
    useEffect(() => {
        setWindowWidth(window.clientWidth)
    }, [window.clientWidth])

    window.addEventListener( 'resize', (e) => setWindowWidth(e.clientWidth))

    const columnNumber = () => {
        
        if (windowWidth > 1300) {
            return 5
        } else if (windowWidth < 1300 && windowWidth > 1000) {
            return 4
        } else {
            return 3
        }
    }
    const columnLength = Math.ceil(pins.length / columnNumber())
    
    useEffect(() => {
        dispatch(fetchUsersPins(userId))
    },[dispatch, userId])

    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) return <Redirect to="/" />

    return (
        <div className="pinIndexColumns">
            <ul >
                {pins.slice(0, columnLength).map(pin => (
                <li key={pin.id} className="pinContainer">
                    <img src={pin.photoUrl} alt=""/>
                    {pin.title}
                </li>
                ))}
            </ul>
            <ul >
                {pins.slice(columnLength, columnLength * 2).map(pin => (
                <li key={pin.id} className="pinContainer">
                    <img src={pin.photoUrl} alt=""/>
                    {pin.title}
                </li>
                ))}
            </ul>
            <ul >
                {pins.slice(2 * columnLength, 3 * columnLength).map(pin => (
                <li key={pin.id} className="pinContainer">
                    <img src={pin.photoUrl} alt=""/>
                    {pin.title}
                </li>
                ))}
            </ul>
            <ul >
                {pins.slice(3 * columnLength, 4 * columnLength).map(pin => (
                <li key={pin.id} className="pinContainer">
                    <img src={pin.photoUrl} alt=""/>
                    {pin.title}
                </li>
                ))}
            </ul>
            <ul >
                {pins.slice(4 * columnLength).map(pin => (
                <li key={pin.id} >
                    <img src={pin.photoUrl} alt=""/>
                    {pin.title}
                </li>
                ))}
            </ul>
        </div>  
    )
}

export default UserAllPinsBoard