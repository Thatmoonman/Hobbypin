import React, { useState } from 'react';
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

    const [notificationIsHovering, setNotificationIsHovering] = useState(false)
    const [messageIsHovering, setMessageIsHovering] = useState(false)
    const [profileIsHovering, setProfileIsHovering] = useState(false)

    const handleMouseOver = (element) => {
        if (element === 'notifications') {
            setNotificationIsHovering(true)
        } else if (element === 'messages') {
            setMessageIsHovering(true)
        } else if (element === 'profile') {
            setProfileIsHovering(true)
        }
    }

    const handleMouseOut = (element) => {
        if (element === 'notifications') {
            setNotificationIsHovering(false)
        } else if (element === 'messages') {
            setMessageIsHovering(false)
        } else if (element === 'profile') {
            setProfileIsHovering(false)
        } 
    }


    let sessionLinks;
    if (sessionUser) {
        const username = sessionUser.username

        sessionLinks = (
        <div className="navBar">
            <NavLink exact to="/">H-logo</NavLink>
            <NavLink exact to="/" className="homeNavLink"><p>Home</p></NavLink>
            <NavLink exact to="/" className="todayNavLink">Today</NavLink>
            <CreateDropdown />
            <SearchBar />
            <div className='navIcon' 
                onMouseEnter={() => handleMouseOver('notifications')} 
                onMouseOut={() => handleMouseOut('notifications')}>
                <i className="fa-solid fa-bell"
                    onMouseEnter={() => handleMouseOver('notifications')} 
                    onMouseOut={() => handleMouseOut('notifications')}>
                </i>
            </div>
                {notificationIsHovering && <div className='navNotifications'>Notifications</div>}
            <div className='navIcon' 
                onMouseEnter={() => handleMouseOver('messages')} 
                onMouseOut={() => handleMouseOut('messages')}>
                <i className="fa-solid fa-comment-dots"
                    onMouseEnter={() => handleMouseOver('messages')} 
                    onMouseOut={() => handleMouseOut('messages')}>
                </i>
            </div>
                {messageIsHovering && <div className='navNotifications'>Messages</div>}
            <NavLink exact to={`/users/${username}`} className='navIcon' 
                onMouseEnter={() => handleMouseOver('profile')} 
                onMouseOut={() => handleMouseOut('profile')}>
                <i className="fa-sharp fa-solid fa-face-smile"
                    onMouseEnter={() => handleMouseOver('profile')} 
                    onMouseOut={() => handleMouseOut('profile')}>
                </i>
            </NavLink>
                {profileIsHovering && <div className='navNotifications' >Your profile</div>}
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