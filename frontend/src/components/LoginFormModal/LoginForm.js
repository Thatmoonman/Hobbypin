import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css'

const LoginFormPage = (props) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const setShowModal = props.setShowModal

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to="/" />;

    const setDemoUser = () => {
        setEmail('demo.user@demo.io')
        setPassword('password')
    }
        
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors([]);
        return dispatch(sessionActions.login({email, password}))
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
    }

    const renderErrors = (errorType) => {
        const renderedErrors = []

        errors.map(error => {
            const errorCode = error.split(" ")[1]
            const errorMessage = error

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
            By continuing you agree in a totally non-legally binding way that you are really impressed and are dying to know more about the developer.
        </p>
    ) 

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false)
    }
    
    return (
        <div className="loginModal">
            <div className="buttonBox">
                <button onClick={closeModal} className="xButton"><i className="fa-solid fa-x"></i></button>
            </div>
            <div className="logo">H</div>
            <h1 className="welcome">Welcome to Hobbypin</h1>
            <form onSubmit={handleSubmit} className="loginForm">
                {errors.length ? renderErrors() : <></>}
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div>{renderErrors('Email')}</div>
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>{renderErrors('Password')}</div>
                <div className="forgotPassword" onClick={setDemoUser}>Forgot your password?</div>
                <button className="login loginButton">Log In</button>
                <p className="or">OR</p>
                <button className="demo loginButton" onClick={setDemoUser}>Log in as Demo User</button>
                {finePrint()}
            </form>
        </div>
    )

}

export default LoginFormPage