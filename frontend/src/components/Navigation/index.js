import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import SearchBar from './SearchBar';

function Navigation(){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
        <div className="navBar">
            <NavLink exact to="/">H-logo</NavLink>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/">Today</NavLink>
            <div>Create dropdown</div>
            <SearchBar />
            <div>notifications</div>
            <div>messages</div>
            <div>profile page</div>
            <ProfileButton user={sessionUser} />
        </div>
        );
    } else {
        sessionLinks = (
            <div className='navBar'>
                <NavLink exact to="/">H-logo: Hobbypin</NavLink>
                <div className='rightNav'>
                    <div className='externalLinks'>
                        <Link className='externalLink'>About</Link>
                        <Link className='externalLink'>Business</Link>
                        <Link className='externalLink'>Blog</Link>
                    </div>
                    <LoginFormModal />
                    <SignupFormModal />
                </div>
            </div >
        );
    }

    const navContainer = () => (
      sessionUser ? 'navContainer loggedIn' : 'navContainer'
    )

    return (
        <div className={navContainer()}>
            {sessionLinks}
        </div>
    );
}

export default Navigation;