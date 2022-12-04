import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'


const SignupFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const setDemoUser = (e) => {
        e.preventDefault();
        return
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
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
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const renderErrors = () => {
        return (
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        )
    }

    const finePrint = () => (
        <p className="finePrint">
            By signing up you agree in a totally non-legally binding way that you are really impressed and are dying to know more about the developer.
        </p>
    ) 


    return (
        <div className="signupForm">
            <div>X</div>
            <div>LOGO GOES HERE</div>
            <h1 className="welcome">Welcome to Hobbypin</h1>
            <div>tagline goes here</div>
            {errors.length ? renderErrors() : <></>}
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input 
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='age'>Age:</label>
                <input 
                    id='age'
                    type='number'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <label htmlFor='password'>Password:</label>
                <input 
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='confirmPassword'> Confirm Password:</label>
                <input 
                    id='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="signup button">Sign Up</button>
                <button className="demo button" onClick={setDemoUser}>Log in as Demo User</button>
            </form>
            {finePrint()}
        </div>
    )
 }

export default SignupFormPage