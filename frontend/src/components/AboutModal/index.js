import { Modal } from "../../context/Modal"
import './AboutModal.css'

const AboutModal = (props) => {
    const setShowAboutModal = props.setShowAboutModal

    return (
        <Modal onClose={() => setShowAboutModal(false)}>
            <div className="aboutModal">
                <h1>ABOUT THE DEV</h1>
                <p></p>
            </div>
        </Modal>
    )
}

export default AboutModal