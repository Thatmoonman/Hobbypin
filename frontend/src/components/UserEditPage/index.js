import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import './UserEdit.css'
import { fetchUser, updateUser } from "../../store/user"


const UserEditPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const [username, setUsername] = useState(user.username)
    const [firstName, setFirstName] = useState(user.firstName ? user.firstName : '')
    const [lastName, setLastName] = useState(user.lastName ? user.lastName : '')
    const [about, setAbout] = useState(user.about ? user.about : '')
    const [preferredPronouns, setPreferredPronouns] = useState(user.preferredPronouns ? user.preferredPronouns : '')
    const [imgUrl, setImgUrl] = useState(user.imgUrl ? user.imgUrl : '')
    const [website, setWebsite] = useState(user.website ? user.website : '')

    // useEffect(() => {
    //     if (user) dispatch(fetchUser(user))
    // }, [user])

    if (!user) return <Redirect to='/' />


    const handleResetForm = (e) => {
        e.preventDefault()

        return
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        
        const data = {
            ...user,
            username: username,
            first_name: firstName,
            last_name: lastName,
            about: about,
            preferredPronouns: preferredPronouns,
            imgUrl: imgUrl,
            website: website
        }

        dispatch(updateUser(data))
    }

    return (
        <div className="editPageContainer">
            <div className="sideBar">
                <button>Public Profile</button>
            </div>
            <div className="editFormContainer">
                <h1>Public profile</h1>
                <h2>People visitting your profile can see the following</h2>
                <form className="editForm" onSubmit={handleUpdateUser}>
                    <p className="label">Photo</p>
                    <div className="photoEditBox">
                        <div><i className="fa-solid fa-person"></i></div>
                        <div>Change</div>
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
                    <label htmlFor="pronouns" className="label">Pronouns</label>
                    <select
                        id="pronouns"
                        className="input"
                        value={preferredPronouns}
                        onChange={(e) => setPreferredPronouns(e.target.value)}
                    >
                        <option disabled>select your preferred pronouns</option>
                        <option>he/him</option>
                        <option>she/her</option>
                        <option>they/them</option>
                    </select>
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
        </div>
    )
}

export default UserEditPage
