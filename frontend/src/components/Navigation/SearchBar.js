import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { fetchAllPins, getPins } from '../../store/pins'
import { Link, useHistory } from 'react-router-dom';
import { fetchUsers, getUsers } from '../../store/user';
import SearchPins from './SearchPins';
import SearchUsers from './SearchUsers';


const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [search, setSearch] = useState('')
    const [searchModal, setSearchModal] = useState(false)
    
    const pins = useSelector(getPins)
    const [searchPins, setSearchPins] = useState(pins) 
    const users = useSelector(getUsers)
    const [searchUsers, setSearchUsers] = useState(pins)

    const magnifyingGlass = () => (
        <div style={{ color: '#767676', fontSize: "16px"}}>
           <i className="fa-solid fa-magnifying-glass"></i>
        </div>
    );

    useEffect(() => {
        dispatch(fetchAllPins())
        dispatch(fetchUsers())
    },[])

    useEffect(() => {
        if (search.length > 0) {
            setSearchModal(true)
            setSearchPins(pins.filter(pin => pin.title.toLowerCase().includes(search.toLowerCase())))
            setSearchUsers(users.filter(user => user.username.toLowerCase().includes(search.toLowerCase())))
        } else {
            setSearchModal(false)
        }
    }, [search])
   
    return (
        <div className="searchContainer">
            <div className="searchBar">
                {magnifyingGlass()}
                <input 
                    type='text'
                    placeholder='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {searchModal && 
                <div className="searchModal">
                    {searchPins.length || searchUsers.length ? (
                    <>
                        <SearchPins pins={searchPins} setSearch={setSearch}/>
                        <SearchUsers users={searchUsers} setSearch={setSearch}/>
                    </>
                    ) : (
                    <div>{"Nothing matched your search. Try again."}</div>
                    )}
                </div>
        }
        </div>
    )
}

export default SearchBar