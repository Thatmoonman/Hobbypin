import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";

const EditBoardDropdown = (props) => {
    const setShowEditBoardModal = props.setShowEditBoardModal

    return (
        <div className="editBoardDropdown">
            <h4>Board options</h4>
            <p>Edit Board</p>
            <p>Delete Board</p>
        </div>
    )

}

export default EditBoardDropdown