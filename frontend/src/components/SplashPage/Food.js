
const FoodPage = (props) => {
    const pins = props.pins

    const foodPins = []
    pins.forEach(pin => {
        if ([4, 9, 14, 18, 24].includes(pin.id)) {
            foodPins.push(pin)
        }
    })

    return (
        <div className="splashContainer">
            <h1>Get your next</h1>
            <h1 className="foodHeader">foodie fad idea</h1>
            <div className="photoContainer">
                <div className="photoOne">{pins.length ? <img src={foodPins[0].photoUrl} alt=""/> : <></>}</div>
                <div className="photoTwo">{pins.length ? <img src={foodPins[1].photoUrl} alt=""/> : <></>}</div>
                <div className="photoThree">{pins.length ? <img src={foodPins[2].photoUrl} alt=""/> : <></>}</div>
                <div className="photoFour">{pins.length ? <img src={foodPins[3].photoUrl} alt=""/> : <></>}</div>
                <div className="photoFive">{pins.length ? <img src={foodPins[4].photoUrl} alt=""/> : <></>}</div>
            </div>
        </div>
    )
}

export default FoodPage