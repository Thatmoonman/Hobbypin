import { useEffect, useState } from "react"
import CreateBoard from "../Boards/CreateBoardModal"


const CreateDropdown = () => {

    const [showCreateMenu, setShowCreateMenu] = useState(false)
    const [showBoardModal, setShowBoardModal] = useState(false)
    const [accountIsHovering, setAccountIsHovering] = useState(false)

    const handleMouseOver = () => {
        setAccountIsHovering(true)
    }
  
    const handleMouseOut = () => {
        setAccountIsHovering(false)
    }
    const toggleMenu = (e) => {
        e.preventDefault()
        showCreateMenu ? setShowCreateMenu(false) : setShowCreateMenu(true)
    }

    const handleCreateBoard = (e) => {
        e.preventDefault()
        setShowCreateMenu(false)
        setShowBoardModal(true)
    }

    useEffect(() => {
        if (!showCreateMenu) return;
    
        const closeMenu = () => {
          setShowCreateMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
    }, [showCreateMenu]);

    return (
        <div className="createDropdownContainer">
            <p onClick={toggleMenu}>Create</p>
            <button onClick={toggleMenu}>
                <i className="fa-solid fa-chevron-down"></i>
            </button>
            {showCreateMenu && 
                <div className="createMenu">
                    <div onClick={handleCreateBoard}>Create board</div>
                </div>
            }
            {showBoardModal && <CreateBoard setShowBoardModal={setShowBoardModal}/>}
        </div>
    )
}

export default CreateDropdown