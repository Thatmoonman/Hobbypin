import PinCard from "./PinCard"


const MobileAllPinsIndex = ({allPins, boards}) => {

    return (
        <ul>
            {allPins.map((pin, i) =>
                <div key={i} className="pinMobileContainer snap">
                    <h1>{pin.title}</h1>
                    <PinCard pin={pin} boards={boards}/>
                </div>
            )}
        </ul>
    )
}

export default MobileAllPinsIndex