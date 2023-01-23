import { useState } from "react"
import { useDispatch } from "react-redux"
import { updatePin } from "../../../store/pins";
import './UpdatePin.css'


const UpdatePin = (props) => {
    const dispatch = useDispatch();
    const pin = props.pin
    const setShowUpdatePin = props.setShowUpdatePin

    const [title, setTitle] = useState(pin.title)
    const [description, setDescription] = useState(pin.description)

    const handleUpdatePin = (e) => {
        e.preventDefault()
        setShowUpdatePin(false)
        
        const updatedPin = {
            ...pin,
            title: title,
            description: description
        }

        dispatch(updatePin(updatedPin))
    }

    return (
        <form onSubmit={handleUpdatePin} className="updatePinModal">
            <div className="updatePinInputContainer">
                <label htmlFor="title">Title:</label>
                <input id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="updatePinInputContainer">
                <label htmlFor="description">Description: </label>
                <textarea id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button className="saveButton">Save</button>
        </form>
    )
}

export default UpdatePin