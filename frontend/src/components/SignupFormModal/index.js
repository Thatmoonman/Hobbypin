import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className="signupFormButton">
                <div className='signupFormButtonText'>Sign&nbsp;Up</div>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;