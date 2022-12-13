import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Modal } from "../../../context/Modal"
import { removePinFromBoard } from "../../../store/pinned_boards"
import "./RemovePinModal.css"


const RemovePinFromBoardModal = (props) => {
    const dispatch = useDispatch()

    const setShowRemovePinModal = props.setShowRemovePinModal
    const pins = props.pins
    const { boardId } = useParams();

    const handleRemovePin = (e, pin) => {
        e.preventDefault()
        dispatch(removePinFromBoard(pin.id, boardId))
    }

    return (
        <Modal onClose={() => setShowRemovePinModal(false)}>
            <ul className="removePinModal">
                {pins.map(pin => (
                    <li key={pin.id} className="removePinItem">
                        <p>{pin.title}</p>
                        <button onClick={(e) => handleRemovePin(e, pin)}>Remove Pin</button>
                    </li>
                ))}
            </ul>
        </Modal>
    )
}

export default RemovePinFromBoardModal