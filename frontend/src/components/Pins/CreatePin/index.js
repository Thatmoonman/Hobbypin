import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../../context/Modal"
import { createPin } from "../../../store/pins"
import './CreatePin.css'


const CreatePinModal = (props) => {
    const dispatch = useDispatch()
    const setShowPinModal = props.setShowPinModal

    const currentUser = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [photoFile, setPhotoFile] = useState('')
    const [preview, setPreview] = useState('')

    const [noPhoto, setNoPhoto] = useState(false)
    const noPhotoError = 'Pin photo required.'

    const handleFile = (e) => {
        const file = e.currentTarget.files[0]
        setPhotoFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleCreatePin = (e) => {
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
        
    }

    return (
        <Modal onClose={() => setShowPinModal(false)}>
            <div className="createPinContainer">
                <div className="createPinTop">
                    <div>Delete</div>
                    <div>Save Board</div>
                </div>
                <form onSubmit={handleCreatePin} className="createPinForm">
                    <div className="createPinPicture">
                        <label htmlFor="img">Select image:</label>
                        <img className='previewPhoto' src={preview} alt={title}/>
                        <input type="file" id="img" name="img" onChange={handleFile}/>
                        {noPhoto && <div>{noPhotoError}</div>}
                        <button>Save Pin</button>
                    </div>
                    <div className="pushUpcreatePinInfo">
                        <div className="createPinInfo">
                            <label htmlFor='title'>Title</label>
                            <input type='text' 
                                id='title' 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor='description'>Description</label>
                            <input type='text' 
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div></div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreatePinModal