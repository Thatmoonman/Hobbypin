import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import SearchBar from './SearchBar';
import CreateDropdown from './CreateDropdown';

function Navigation(){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        const userId = sessionUser.id

        sessionLinks = (
        <div className="navBar">
            <NavLink exact to="/">H-logo</NavLink>
            <NavLink exact to="/" className="homeNavLink"><p>Home</p></NavLink>
            <NavLink exact to="/" className="todayNavLink">Today</NavLink>
            <CreateDropdown />
            <SearchBar />
            <div className='navIcon'><i className="fa-solid fa-bell"></i></div>
            <div className='navIcon'><i className="fa-solid fa-comment-dots"></i></div>
            <NavLink exact to={`/users/${userId}`} className='navIcon'>
                <i className="fa-sharp fa-solid fa-face-smile"></i>
            </NavLink>
            <ProfileButton user={sessionUser} />
        </div>
        );
    } else {
        sessionLinks = (
            <div className='navBar'>
                <NavLink exact to="/">H-logo: Hobbypin</NavLink>
                <div className='rightNav'>
                    <div className='externalLinks'>
                        <NavLink to="/" className='externalLink'>About</NavLink>
                        <Link to={{pathname: "https://github.com/Thatmoonman"}} target="_blank" className='externalLink'>Github</Link>
                        <Link to={{pathname: "https://www.linkedin.com/in/justin-kilburn-3aa38a54/"}} target="_blank"className='externalLink'>LinkedIn</Link>
                    </div>
                    <LoginFormModal />
                    <SignupFormModal />
                </div>
            </div >
        );
    }


    return (
        <div className="navContainer">
            {sessionLinks}
        </div>
    );
}

export default Navigation;