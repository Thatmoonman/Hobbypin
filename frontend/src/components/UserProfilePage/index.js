import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect, useParams } from "react-router-dom";
import { fetchUser, getUser } from "../../store/user";
import BoardIndex from "../Boards/BoardsIndex";
import './UserProfile.css'


const UserProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    
    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId])
    
    // if (!user.keys) return <Redirect to="/" />;

    const showProfileModal = () => {
        return 
    }

    return (
        <div className="userProfileContainer">
            <div className="profileImage" onClick={showProfileModal}><img src={user.profilePic} /></div>
            <h1 className="profileName">{user.username}</h1>
            <p className="profileEmail">{user.email}</p>
            <div className="profileFollows">
                <p className="profileFollowing">0 following</p>
                <p className="profileFollowers"> 0 followers</p>
            </div>
            <div className="profileButtons">
                <button className='shareDropdownMenu'>Share</button>
                <NavLink to={`/users/${user.id}/edit`} className='renderEditButton'>Edit Profile</NavLink>
            </div>
            <BoardIndex />
            <div className="helpContainer">
                <div className="helpIcon"><i className="fa-solid fa-question"></i></div>
            </div>
        </div>
    )
}

export default UserProfilePage