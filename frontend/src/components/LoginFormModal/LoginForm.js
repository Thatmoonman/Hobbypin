import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

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

    const renderErrors = () => {
        return (
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        )
    }

    const finePrint = () => (
        <p className="finePrint">
            By continuing you agree in a totally non-legally binding way that you are really impressed and are dying to know more about the developer.
        </p>
    ) 
    
    return (
        <div className="loginForm">
            <div>X</div>
            <div>LOGO GOES HERE</div>
            <h1 className="welcome">Welcome to Hobbypin</h1>
            <form onSubmit={handleSubmit}>
                {errors.length ? renderErrors() : <></>}
                <label htmlFor="email">Email:</label>
                <input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="login button">Log In</button>
                <button className="demo button" onClick={setDemoUser}>Log in as Demo User</button>
            </form>
            {finePrint()}
        </div>
    )

}

export default LoginFormPage