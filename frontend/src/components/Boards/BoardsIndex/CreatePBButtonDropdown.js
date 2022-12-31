import React, { useEffect } from 'react';

const CreateButtonDropdown = (props) => {
    const showCreateDropdown = props.showCreateDropdown
    const setShowCreateDropdown = props.setShowCreateDropdown
    const setShowBoardModal = props.setShowBoardModal
    
    useEffect(() => {
        if (!showCreateDropdown) return;
    
        const closeMenu = () => {
          setShowCreateDropdown(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
    }, [showCreateDropdown]);

    const renderBoardModal = (e) => {
        e.preventDefault()
        setShowBoardModal(true)
        setShowCreateDropdown(false)
    }

    return (
        <>
            <div className="createButtonDropdown" >
                <h4>Create</h4>
                {/* <p className='cpbdLink'>Pin</p> */}
                {/* <p className='cpbdLink'>Idea Pin</p> */}
                <p className='cpbdLink' onClick={renderBoardModal}>Board</p>
            </div>
        </>

    )
}

export default CreateButtonDropdown