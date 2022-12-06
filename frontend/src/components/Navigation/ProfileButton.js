import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [accountIsHovering, setAccountIsHovering] = useState(false)

  const handleMouseOver = () => {
    setAccountIsHovering(true)
  }

  const handleMouseOut = () => {
    setAccountIsHovering(false)
  }
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const ProfileImage = () => (
    <div className="profileTagImage">
      <i className="fa-solid fa-person"></i>
    </div>
  );
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const menu = () => {
    return (
      <ul className="accountMenu">
        <p>Currently in</p>
        <div className="profileTag">
          {ProfileImage()}
          <div>
            <li className="profileTagUsername">{user.username}</li>
            <li className="profileTagEmail">{user.email}</li>  
          </div>
          <div className="checkMark"><i class="fa-solid fa-check"></i></div>
        </div>
        <li>
          <button onClick={logout} className="logoutButton">Log Out</button>
        </li>
      </ul>
    )
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profileDropDown"
          onClick={openMenu} 
          onMouseEnter={() => handleMouseOver('account')} 
          onMouseOut={() => handleMouseOut('account')}>
          <i className="fa-solid fa-chevron-down" 
              onMouseEnter={() => handleMouseOver('account')} 
              onMouseOut={() => handleMouseOut('account')}>
          </i>
      </button>
      {accountIsHovering && <div className='navTooltip navAccount' >Account and more options</div>}
      {showMenu && menu()}
    </>
  );
}

export default ProfileButton;