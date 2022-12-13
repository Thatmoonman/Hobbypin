import { useEffect } from "react";

const EditBoardDropdown = (props) => {
    const showEditBoardDropdown = props.showEditBoardDropdown
    const setShowEditBoardDropdown = props.setShowEditBoardDropdown
    const setShowEditBoardModal = props.setShowEditBoardModal
    const setShowDeleteBoardModal = props.setShowDeleteBoardModal
    const setShowRemovePinModal = props.setShowRemovePinModal

    useEffect(() => {
        if (!showEditBoardDropdown) return;
    
        const closeMenu = () => {
          setShowEditBoardDropdown(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
    }, [showEditBoardDropdown]);


    const handleShowEditModal = (e) => {
        e.preventDefault()

        setShowEditBoardModal(true)
        setShowEditBoardDropdown(false)
    } 

    const handleShowRemovePinModal = (e) => {
        e.preventDefault()

        setShowRemovePinModal(true)
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
            <p onClick={handleShowRemovePinModal}>Remove Pin</p>
            <p onClick={handleShowDeleteModal}>Delete Board</p>
        </div>
    )

}

export default EditBoardDropdown