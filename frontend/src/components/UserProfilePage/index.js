import React from "react";
import { useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom";
import './UserProfile.css'


const UserProfilePage = () => {
    const user = useSelector(state => state.session.user);

    if (!user) return <Redirect to="/" />;

    return (
        <div className="userProfileContainer">
            <div className="profileImage">profile image</div>
            <h1 className="profileName">{user.username}</h1>
            <p className="profileEmail">{user.email}</p>
            <p className="profile profileFollows">follows</p>
            <div className="profile profileButtons">
                <button className='shareDropdownMenu'>Share</button>
                <NavLink to={`/users/${user.username}/edit`} className='renderEditButton'>Edit Profile</NavLink>
            </div>
            <div className="profile profileBoardIndex">Board Index Container</div>
        </div>
    )
}

export default UserProfilePage