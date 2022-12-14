

const SaveIdeas = (props) => {
    const pins = props.pins

    const bigPic = pins[5]
    const medPicOne = pins[21]
    const medPicTwo = pins[0]
    const medPicThree = pins[22]
    const smallPic = pins[11]

    return (
        <div className="snap saveIdeasContainer">
            <div>
                <h1>Save ideas you like</h1>
                <h2>Collect your favorites so you can get back to them later.</h2>
            </div>
            <div>
                <div className="bigPic picContainer">{pins.length ? <img src={bigPic.photoUrl} alt=""/> : <></>}</div>
                <div className="picRight">
                    <div className="medPic picContainer">{pins.length ? <img src={medPicOne.photoUrl} alt=""/> : <></>}</div>    
                </div>
            </div>
            <div>
                <div className="picRight">
                    <div className="medPic picContainer">{pins.length ? <img src={medPicTwo.photoUrl} alt=""/> : <></>}</div>
                </div>
                <div className="smallPic picContainer">{pins.length ? <img src={smallPic.photoUrl} alt=""/> : <></>}</div>
                <div className="medPic picContainer">{pins.length ? <img src={medPicThree.photoUrl} alt=""/> : <></>}</div>
            </div>
        </div>
    )

}

export default SaveIdeas