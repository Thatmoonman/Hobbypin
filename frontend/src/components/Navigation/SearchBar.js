import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { fetchAllPins, getPins } from '../../store/pins'
import { Link, useHistory } from 'react-router-dom';
import PinCard from '../Pins/AllPinsIndex/PinCard';


const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [search, setSearch] = useState('')
    const [searchModal, setSearchModal] = useState(false)
    
    const pins = useSelector(getPins)
    const [searchPins, setSearchPins] = useState(pins)

    const magnifyingGlass = () => (
        <div style={{ color: '#767676', fontSize: "16px"}}>
           <i className="fa-solid fa-magnifying-glass"></i>
        </div>
    );

    useEffect(() => {
        dispatch(fetchAllPins())
    },[])

    useEffect(() => {
        if (search.length > 0) {
            setSearchModal(true)
            setSearchPins(pins.filter(pin => pin.title.toLowerCase().includes(search.toLowerCase())))
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
                        {searchPins.map(pin => (
                            // <PinCard className="searchPinCard" key={pin.id} pin={pin} />
                            <Link to={`/users/${pin.uploaderId}/pins/${pin.id}`} className="searchPinCard" key={pin.id} >
                                <img src={pin.photoUrl} alt=""/>
                                {pin.title}
                            </Link>
                        ))}
                    </div>
            }
        </div>
    )
}

export default SearchBar