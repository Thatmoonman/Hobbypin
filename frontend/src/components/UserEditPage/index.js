import PublicProfileEdit from './PublicProfileEditPage'
import './UserEdit.css'



const UserEditPage = () => {
   

    return (
        <div className="editPageContainer">
            <div className="sideBar">
                <button>Public Profile</button>
            </div>
            <PublicProfileEdit />
        </div>
    )
}

export default UserEditPage
