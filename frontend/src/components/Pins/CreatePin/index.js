import { useState } from "react"
import { Modal } from "../../../context/Modal"
import './CreatePin.css'


const CreatePinModal = (props) => {

    const setShowPinModal = props.setShowPinModal

    return (
        <Modal onClose={() => setShowPinModal(false)}>
            <div className="createPinContainer">
                <div className="createPinTop">
                    <div>Delete</div>
                    <div>Save Board</div>
                </div>
                <form className="createPinForm">
                    <div className="createPinPicture">
                        <div>Drag and Drop pic</div>
                        <button>Save Pin</button>
                    </div>
                    <div className="pushUpcreatePinInfo">
                        <div className="createPinInfo">
                            <label for='title'>Title</label>
                            <input type='text' id='title' />
                            <label for='description'>Description</label>
                            <input type='text' id='description'/>
                        </div>
                        <div></div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreatePinModal