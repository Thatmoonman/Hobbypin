import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";

const EditBoardDropdown = (props) => {
    const setShowEditBoardDropdown = props.setShowEditBoardDropdown
    const setShowEditBoardModal = props.setShowEditBoardModal
    const setShowDeleteBoardModal = props.setShowDeleteBoardModal

    const handleShowEditModal = (e) => {
        e.preventDefault()

        setShowEditBoardModal(true)
        setShowEditBoardDropdown(false)
    } 

    const handleShowDeleteModal = (e) => {
        e.preventDefault()

        setShowDeleteBoardModal(true)
        setShowEditBoardDropdown(false)
    } 

    return (
        <div className="editBoardDropdown">
            <h4>Board options</h4>
            <p onClick={handleShowEditModal}>Edit Board</p>
            <p onClick={handleShowDeleteModal}>Delete Board</p>
        </div>
    )

}

export default EditBoardDropdown