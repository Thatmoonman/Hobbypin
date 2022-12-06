import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, Redirect } from "react-router-dom";
import { fetchUser, getUser } from "../../store/user";
import './UserProfile.css'


const UserProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId])

    if (!user) return <Redirect to="/" />;

    return (
        <div className="userProfileContainer">
            <div>profile image</div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
            <p>follows</p>
            <div>
                <button>share</button>
                <button>edit</button>
            </div>
            <div>Board Index Container</div>
        </div>
    )
}

export default UserProfilePage