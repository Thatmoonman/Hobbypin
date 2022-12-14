//5 10 15 19 25

const TravelPage = (props) => {
    const pins = props.pins

    const travelPins = []
    pins.forEach(pin => {
        if ([5, 10, 15, 19, 25].includes(pin.id)) {
            travelPins.push(pin)
        }
    })

    return (
        <div className="splashContainer">
            <h1>Get your next</h1>
            <h1 className="travelHeader">seasonal travel idea</h1>
            <div className="photoContainer">
                <div className="photoOne">{pins.length ? <img src={travelPins[0].photoUrl} alt=""/> : <></>}</div>
                <div className="photoTwo">{pins.length ? <img src={travelPins[1].photoUrl} alt=""/> : <></>}</div>
                <div className="photoThree">{pins.length ? <img src={travelPins[2].photoUrl} alt=""/> : <></>}</div>
                <div className="photoFour">{pins.length ? <img src={travelPins[3].photoUrl} alt=""/> : <></>}</div>
                <div className="photoFive">{pins.length ? <img src={travelPins[4].photoUrl} alt=""/> : <></>}</div>
            </div>
        </div>
    )
}

export default TravelPage