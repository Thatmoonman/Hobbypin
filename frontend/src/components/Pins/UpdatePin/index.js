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
            <div className="focusInputs">
                {title.length <= 25 && title.length >= 3 ? (
                    <>
                        <div>Title must be between 3 and 25 characters</div>
                        <div>{title.length}/{25 - title.length}</div>
                    </>
                ) : (
                    <>
                    {title.length < 3 ? (
                        <>
                            <div className="focusInputsError">Title must be between 3 and 25 characters</div>
                            <div className="focusInputsError">{title.length}/{25 - title.length}</div>
                        </>
                    ) : (
                        <>
                            <div className="focusInputsError">Title too long</div>
                            <div className="focusInputsError">{title.length}/25</div>
                        </>
                    )}
                    </>
                )}
            </div>
            <div className="updatePinInputContainer">
                <label htmlFor="description">Description: </label>
                <textarea id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="focusInputs">
                                    {description.length <= 100 ? (
                                        <>
                                            <div>A short description is best  </div>
                                            <div>{description.length}/{100 - description.length}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="focusInputsError">Description too long</div>
                                            <div className="focusInputsError">{description.length}/100</div>
                                        </>
                                    )}
                                </div>
            <button className="saveButton">Save</button>
        </form>
    )
}

export default UpdatePin