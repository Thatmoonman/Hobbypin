import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Modal } from "../../../context/Modal"
import { createPin } from "../../../store/pins"
import './CreatePin.css'


const CreatePinModal = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const setShowPinModal = props.setShowPinModal

    const currentUser = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [photoFile, setPhotoFile] = useState('')
    const [preview, setPreview] = useState('')

    const [titleFocused, setTitleFocused] = useState(false)
    const [descriptionFocused, setDescriptionFocused] = useState(false)

    const [noPhoto, setNoPhoto] = useState(false)
    const noPhotoError = 'Pin photo required.'

    const resetPin = () => {
        setTitle('')
        setDescription('')
        setPhotoFile('')
        setPreview('')
    }

    const handleFile = (e) => {
        const file = e.currentTarget.files[0]
        setPhotoFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleCreatePin = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('pin[uploaderId]', currentUser.id)
        formData.append('pin[title]', title);
        formData.append('pin[description]', description);
        if (photoFile) {
            formData.append('pin[photo]', photoFile);
        } else  {
            setNoPhoto(true)
            return
        }
        
        dispatch(createPin(formData))
        setShowPinModal(false)
            
        
        history.push(`/users/${currentUser.id}/pins`)
    }

    return (
        <Modal onClose={() => setShowPinModal(false)}>
            <div className="createPinContainer">
                <div className="createPinTop">
                    <div className="resetPinButton" onClick={resetPin}><i className="fa-solid fa-trash"></i></div>
                    <div>Save Board</div>
                </div>
                <form onSubmit={handleCreatePin} className="createPinForm">
                    <div className="createPinPicture">
                        {preview ? (
                            <img className='previewPhoto' src={preview} alt={title}/>
                        ) : (
                            <input type="file" id="pinImageUploader" onChange={handleFile} />
                        )}
                        {noPhoto && <div>{noPhotoError}</div>}
                        {title && description && photoFile ? (
                            <button className="savePinButton">Save Pin</button>
                        ) : (
                            <button className="savePinButtonDisabled" disabled>Save Pin</button>
                        )}
                    </div>
                    <div className="pushUpcreatePinInfo">
                        <div className="createPinInfo">
                            <input type='text' 
                                id='pinTitle' 
                                placeholder="Add your title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onFocus={() => setTitleFocused(true)}
                                onBlur={() => setTitleFocused(false)}
                            />
                            {titleFocused ? (
                                <div className="focusInputs">
                                    {title.length <= 25 && title.length > 3 ? (
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
                            ) : (
                                <br></br>
                            )}
                            <div className="createPinProfileContainer">
                                <img className="createPinProfilePic" src={currentUser.profilePic} alt={currentUser.username} />
                                <div>{currentUser.username}</div>
                            </div>
                            <textarea type='text' 
                                id='pinDescription'
                                placeholder="Tell everyone what your pin is about"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onFocus={() => setDescriptionFocused(true)}
                                onBlur={() => setDescriptionFocused(false)}
                            />
                            {descriptionFocused ? (
                                <div className="focusInputs">
                                    {description.length <= 100 ? (
                                        <>
                                            <div>A short description is best</div>
                                            <div>{description.length}/{100 - description.length}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="focusInputsError">Description too long</div>
                                            <div className="focusInputsError">{description.length}/100</div>
                                        </>
                                    )}
                                </div>
                                ) : (
                                <br></br>
                            )}
                        </div>
                        <div></div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreatePinModal