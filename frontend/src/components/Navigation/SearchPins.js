import { Link } from "react-router-dom"


const SearchPins = (props) => {
    const pins = props.pins
    const setSearch = props.setSearch

    return (
        <>
        {pins.length ? (
            <>
            <div>Pins:</div>
            {pins.map(pin => (
                <Link to={`/users/${pin.uploaderId}/pins/${pin.id}`} className="searchCard" key={pin.id} onClick={() => setSearch('')}>
                    <img src={pin.photoUrl} alt=""/>
                    {pin.title}
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

export default SearchPins