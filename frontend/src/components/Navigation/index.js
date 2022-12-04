import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className='navLink'>Log In</NavLink>
        <NavLink to="/signup" className='navLink'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li className='navContainer'>
        <NavLink exact to="/" className='navLink'>Home</NavLink>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;