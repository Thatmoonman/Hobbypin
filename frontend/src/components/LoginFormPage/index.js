import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginFormPage.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to="/" />;

    const finePrint = () => (
        <p className="finePrint">
            By continuing you agree in a non-legally binding way that you are really impressed and are dying to know more about the developer.
        </p>
    ) 
        

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
    
    return (
        <div className="loginForm">
            <div>LOGO GOES HERE</div>
            <h1 className="welcome">Welcome to Hobbypin</h1>
            <form onSubmit={handleSubmit}>
                {errors.length ? renderErrors() : <></>}
                <label htmlFor="email">Email:</label>
                <input 
                    id="email"
                    type="text"
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
                <button className="demo button">Log in as Demo User</button>
            </form>
            {finePrint()}
        </div>
    )

}

export default LoginFormPage