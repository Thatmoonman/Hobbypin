import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchUsersPins, getPins } from "../../../store/pins";

const UserAllPinsBoard = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    const { userId } = useParams()
    
    useEffect(() => {
        dispatch(fetchUsersPins(userId))
    },[userId])

    return (
        <>
            <ul>
                {pins.map(pin => (
                    <li key={pin.id}>
                        {pin.title}
                        <img src={pin.photoUrl} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserAllPinsBoard