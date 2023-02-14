import { Link } from "react-router-dom"


const SearchUsers = (props) => {
    const users = props.users
    const setSearch = props.setSearch

    return (
        <>
        {users.length ? (
            <>
             <div>Users:</div>
            {users.map(user => (
                <Link to={`/users/${user.id}`} key={user.id} className="searchCard" onClick={() => setSearch('')}>
                    <img src={user.profilePic} alt="" />
                    <div>{user.username}</div>
                </Link>
            ))}
            </>
        ) : (
            <></>
        )
        }
        </>
    )
}

export default SearchUsers