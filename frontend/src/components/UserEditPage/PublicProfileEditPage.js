import { Redirect, useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { fetchUser, updateUser, getUser } from "../../store/user"


const PublicProfileEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))

    const originalUsername = user && user.username ? user.username : ''
    const [username, setUsername] = useState(originalUsername)
    const originalFirstName = user && user.firstName ? user.firstName : ''
    const [firstName, setFirstName] = useState(originalFirstName)
    const originalLastName = user && user.lastName ? user.lastName : ''
    const [lastName, setLastName] = useState(originalLastName)
    const originalAbout = user && user.about ? user.about : ''
    const [about, setAbout] = useState(originalAbout)
    const [preferredPronouns, setPreferredPronouns] = useState(user && user.preferredPronouns ? user.preferredPronouns : '')
    const [imgUrl, setImgUrl] = useState(user && user.imgUrl ? user.imgUrl : '')
    const originalWebsite = user && user.website ? user.website : ''
    const [website, setWebsite] = useState(originalWebsite)

    useEffect(() => {
        if (userId) dispatch(fetchUser(userId))
    }, [dispatch, userId])

    const handleResetForm = (e) => {
        e.preventDefault()
        setUsername(originalUsername)
        setFirstName(originalFirstName)
        setLastName(originalLastName)
        setAbout(originalAbout)
        setWebsite(originalWebsite)
        return
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        
        const data = {
            ...user,
            username: username,
            firstName: firstName,
            lastName: lastName,
            about: about,
            imgUrl: imgUrl,
            website: website
        }

        dispatch(updateUser(data))
        history.push(`/users/${userId}`)
    }

    return (
        <div className="editFormContainer">
            <h1>Public profile</h1>
            <h2>People visitting your profile can see the following</h2>
            <form className="editForm" onSubmit={handleUpdateUser}>
                <p className="label">Photo</p>
                <div className="photoEditBox">
                    <div><img src={user.profilePic} alt=""/></div>
                    {/* <div>Change</div> */}
                </div>
                <div className="nameEditContainer">
                    <div className="nameEditInput">
                        <label htmlFor="firstname" className="label">First name</label>
                        <input 
                            id='firstname'
                            className="input"
                            type='text' 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='Your first name'
                        />
                    </div>
                    <div className="nameEditInput">
                        <label htmlFor="lastname" className="label">Last name</label>
                        <input 
                            id='lastname'
                            className="input"
                            type='text' 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Your last name'
                        />
                    </div>
                </div>
                <label htmlFor="about" className="label">About</label>
                <textarea 
                    id="about"
                    className="input"
                    rows='5'
                    cols='10'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder='Tell your story'
                />
                <label htmlFor="website" className="label">Website</label>
                <input 
                    id="website"
                    className="input"
                    type='text'
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder='Add a link'
                />
                <label htmlFor="username" className="label">Username</label>
                <input 
                    id="username"
                    className="input"
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="editButtonContainer">
                    <button onClick={handleResetForm}>Reset</button>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PublicProfileEdit