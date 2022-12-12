import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchPin, getPin } from "../../../store/pins";
import './PinShow.css'


const PinShowPage = () => {
    const dispatch = useDispatch();
    const { userId, pinId } = useParams();
    const pin = useSelector(getPin(pinId))
    const windowWidth = document.body.clientWidth
    let pinOrientation = windowWidth > 1100 ? "horizontal" : "vertical"

    useEffect(() => {
        dispatch(fetchPin(userId, pinId))
    }, [pinId])

    return (
        <div className={`pinShowContainer ${pinOrientation}`}>
            <img src={pin.photoUrl} />
            <div className="pinShowDetails">
                <div className="boardSave">
                    <button>Save</button>
                </div>
                <h1>{pin.title}</h1>
                <p>{pin.description}</p>
            </div>
        </div>
    )
}

export default PinShowPage