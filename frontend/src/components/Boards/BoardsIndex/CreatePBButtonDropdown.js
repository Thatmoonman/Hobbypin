import React, { useEffect, useState } from 'react';
import CreatePinModal from '../../Pins/CreatePin';

const CreateButtonDropdown = (props) => {
    const showCreateDropdown = props.showCreateDropdown
    const setShowCreateDropdown = props.setShowCreateDropdown
    const setShowBoardModal = props.setShowBoardModal
    const setShowPinModal = props.setShowPinModal

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

    const renderPinModal = (e) => {
        e.preventDefault()
        setShowPinModal(true)
        setShowCreateDropdown(false)
    }

    return (
        <>
            <div className="createButtonDropdown" >
                {/* <p className='cpbdLink'>Idea Pin</p> */}
                <p className='cpbdLink' onClick={renderPinModal}>Create pin</p>
                <p className='cpbdLink' onClick={renderBoardModal}> Create board</p>
            </div>
           
        </>

    )
}

export default CreateButtonDropdown