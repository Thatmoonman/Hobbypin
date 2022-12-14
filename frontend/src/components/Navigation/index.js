import React, { useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
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
        } else if (element === 'github') {
            setMessageIsHovering(true)
        } else if (element === 'profile') {
            setProfileIsHovering(true)
        }
    }

    const handleMouseOut = (element) => {
        if (element === 'notifications') {
            setNotificationIsHovering(false)
        } else if (element === 'github') {
            setMessageIsHovering(false)
        } else if (element === 'profile') {
            setProfileIsHovering(false)
        } 
    }


    let sessionLinks;
    if (sessionUser) {
        const userId = sessionUser.id

        sessionLinks = (
        <div className="navBar">
            <NavLink exact to="/" className="logoNavLink"><img src="./Hobbypinlogo.png" alt=""/></NavLink>
            <NavLink exact to="/" className="homeNavLink"><p>Home</p></NavLink>
            <Link to={{pathname: "https://www.linkedin.com/in/justin-kilburn-3aa38a54/"}} target="_blank"className='linkedinNav'>LinkedIn</Link>
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
                {notificationIsHovering && <div className='navTooltip navNotifications'>Notifications</div>}
            <Link to={{pathname: "https://github.com/Thatmoonman"}}
                target="_blank"
                className='navIcon'
                onMouseEnter={() => handleMouseOver('github')}
                onMouseOut={() => handleMouseOut('github')}>
                <i className="fa-brands fa-github"
                    onMouseEnter={() => handleMouseOver('github')}
                    onMouseOut={() => handleMouseOut('github')}>
                </i>
            </Link>
                {messageIsHovering && <div className='navTooltip navGithub'>Github</div>}
            <NavLink exact to={`/users/${userId}`} className='navIcon' 
                onMouseEnter={() => handleMouseOver('profile')} 
                onMouseOut={() => handleMouseOut('profile')}>
                <div className='profileNavPicContainerOuter'>
                    <div className='profileNavPicContainerInner'>
                        <img src={sessionUser.profilePic} alt=""
                            onMouseEnter={() => handleMouseOver('profile')} 
                            onMouseOut={() => handleMouseOut('profile')}
                        />
                    </div>
                </div>
            </NavLink>
                {profileIsHovering && <div className='navTooltip navProfile' >Your profile</div>}
            <ProfileButton user={sessionUser} />
        </div>
        );
    } else {
        sessionLinks = (
            <div className='navBar snap'>
                <NavLink exact to="/" className="logoNavLink"><img src="./Hobbypinlogo.png" alt=""/><h1>Hobbypin</h1></NavLink>
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