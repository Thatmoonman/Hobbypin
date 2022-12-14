import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'


const SignupFormPage = (props) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const setShowModal = props.setShowModal
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
       
        setErrors([]);
        setUsername(email.split('@')[0])
        return dispatch(sessionActions.signup({ username, email, age, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };

    const renderErrors = (errorType) => {
        const renderedErrors = []

        errors.map(error => {
            const errorCode = error.split(" ")[0]
            const errorMessage = error.split(" ").slice(1).join(" ")

            if (errorCode === errorType && !renderedErrors.includes(errorMessage)) {
                renderedErrors.push(errorMessage)
            }

            const errorInput = document.getElementById(`${errorCode}`.toLowerCase())
            if (errorInput) errorInput.style.borderColor = 'red'

            return null
        })

        return (
            <ul className="renderErrors">
                {renderedErrors.length ? <i className="fa-solid fa-triangle-exclamation"></i> : <></> }
                {renderedErrors.map(error => <li key={error}>{error}</li>)}
            </ul>
        )
    }

    const finePrint = () => (
        <p className="finePrint">
            By signing up you agree in a totally non-legally binding way that you are really impressed and are dying to know more about the developer.
        </p>
    ) 

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false)
    }

    return (
        <div className="signupModal">
             <div className="buttonBox">
                <button onClick={closeModal} className="xButton"><i className="fa-solid fa-x"></i></button>
            </div>
            <div className="logo"><img src="./Hobbypinlogo.png" alt=""/></div>
            <h1 className="welcome">Welcome to Hobbypin</h1>
            <div className="tagline">tagline goes here</div>
            <form onSubmit={handleSubmit} className="signupForm">
                <label htmlFor='email'>Email</label>
                <input 
                    id='email'
                    type='email'
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div>{renderErrors('Email')}</div>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password'
                    type='password'
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>{renderErrors('Password')}</div>
                <label htmlFor='age'>Age</label>
                <input 
                    id='age'
                    type='text'
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <div>{renderErrors('Age')}</div>
                <button className="signupButton">Sign Up</button>
            </form>
            {finePrint()}
            {/* <div>member login link</div> */}
        </div>
    )
}

export default SignupFormPage