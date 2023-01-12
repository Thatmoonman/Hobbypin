import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, Redirect, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { fetchUser, getUser } from "../../store/user";
import AboutModal from "../AboutModal";
import BoardIndex from "../Boards/BoardsIndex";
import './UserProfile.css'


const UserProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    const currentUser = useSelector(state => state.session.user)
    
    const [showAboutModal, setShowAboutModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [isSessionUser, setIsSessionUser] = useState(false)
    const [loaded, setLoaded] = useState(false)
    console.log(loaded)

    useEffect(() => {
        dispatch(fetchUser(userId))
        setIsSessionUser(false)
        setLoaded(true)
    }, [userId])

    useEffect(() => {
        if (user.id === currentUser.id) setIsSessionUser(true)
    }, [user])

    if (!currentUser) return <Redirect to="/" />

    const displayName = () => {
        if (user.firstName && user.lastName) {
            return user.firstName + " " + user.lastName
        } else {
            return user.username
        }
    }

    const loadUser = () => {
            
        if (loaded) {
            return (
                <div className="notAvailable">
                    <p>User does not exist.</p>
                    <Link to="/" className="notAvailableLink">Return to Home</Link>
                </div>

            )
        } else {
            return (
                <div className="loadingUser">
                    <p>Loading User</p>
                </div>
            )
        }   
    }


    return (
        <>
        {user.id && loaded ? (
            <div className="userProfileContainer">
                <div className="profileImage" onClick={() => setShowProfileModal(true)}><img src={user.profilePic} /></div>
                <h1 className="profileName">{user.username}</h1>
                <p className="profileEmail">{user.email}</p>
                <div className="profileFollows">
                    <p className="profileFollowing">0 following</p>
                    <p className="profileFollowers"> 0 followers</p>
                </div>
                <div className="profileButtons">
                    {/* <button className='shareDropdownMenu'>Share</button> */}
                    {isSessionUser && <NavLink to={`/users/${user.id}/edit`} className='renderEditButton'>Edit Profile</NavLink>}
                </div>
                <BoardIndex />
                <div className="helpContainer" onClick={() => setShowAboutModal(true)}>
                    <div className="helpIcon"><i className="fa-solid fa-question"></i></div>
                </div>
                {showAboutModal && <AboutModal setShowAboutModal={setShowAboutModal}/>}
                {showProfileModal && 
                    <Modal onClose={() => setShowProfileModal(false)}>
                        <div className="profilePicModal">
                            <img src={user.profilePic} alt=""/>
                            <div>{displayName()}</div>
                        </div>
                    </Modal>
                }
            </div>
        ) : (
            <>
                {loadUser()}
            </>
        )}
        </>
    )
}

export default UserProfilePage