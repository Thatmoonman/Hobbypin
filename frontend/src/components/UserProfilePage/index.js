import React from "react";
import { useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom";
import BoardIndex from "../Boards/BoardsIndex";
import './UserProfile.css'


const UserProfilePage = () => {
    const user = useSelector(state => state.session.user);

    if (!user) return <Redirect to="/" />;

    const showProfileModal = () => {
        return 
    }

    return (
        <div className="userProfileContainer">
            <div className="profileImage" onClick={showProfileModal}><i className="fa-solid fa-person"></i></div>
            <h1 className="profileName">{user.username}</h1>
            <p className="profileEmail">{user.email}</p>
            <div className="profileFollows">
                <p className="profileFollowing">0 following</p>
                <p className="profileFollowers"> 0 followers</p>
            </div>
            <div className="profileButtons">
                <button className='shareDropdownMenu'>Share</button>
                <NavLink to={`/users/${user.username}/edit`} className='renderEditButton'>Edit Profile</NavLink>
            </div>
            <BoardIndex />
            <div className="helpContainer">
                <div className="helpIcon"><i className="fa-solid fa-question"></i></div>
            </div>
        </div>
    )
}

export default UserProfilePage