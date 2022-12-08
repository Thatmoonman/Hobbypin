import React from 'react';

const CreateButtonDropdown = (props) => {
    const setShowCreateDropdown = props.setShowCreateDropdown
    const setShowBoardModal = props.setShowBoardModal

    const renderBoardModal = (e) => {
        e.preventDefault()
        setShowBoardModal(true)
        setShowCreateDropdown(false)
    }

    return (
        <>
            <div className="createButtonDropdown" >
                <h4>Create</h4>
                <p className='cpbdLink'>Pin</p>
                <p className='cpbdLink'>Idea Pin</p>
                <p className='cpbdLink' onClick={renderBoardModal}>Board</p>
            </div>
        </>

    )
}

export default CreateButtonDropdown