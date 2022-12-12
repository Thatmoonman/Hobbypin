import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { fetchBoards } from "../../../store/board";
import { fetchAllPins, getPins } from "../../../store/pins";
import './AllPinsIndex.css'
import PinCard from "./PinCard";

const AllPinsIndex = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    const user = useSelector(state => state.session.user)
    const userId = user.id
    
    // const boards = useSelector(getBoards)
    // const [board, setBoard] = useState('')
    
    // useEffect(() => {
    //     dispatch(fetchBoards(userId))
    // }, [userId])
    
    const window = document.body
    const [windowWidth, setWindowWidth] = useState(window.clientWidth)
    
    // useEffect(() => {
    //     setWindowWidth(window.clientWidth)
    // }, [window.clientWidth])

    window.addEventListener( 'resize', (e) => setWindowWidth(e.clientWidth))

    const columnNumber = () => {
        
        if (windowWidth > 1300) {
            return 5
        } else if (windowWidth < 1300 && windowWidth > 1000) {
            return 4
        } else {
            return 3
        }
    }
    const columnLength = Math.ceil(pins.length / columnNumber())
    
    useEffect(() => {
        dispatch(fetchAllPins())
    }, [])

    return (
        <>
            {user ? (
                <>
                <div className="pinIndexColumns">
                    <ul>
                        {pins.slice(0, columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} />
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(columnLength, columnLength * 2).map(pin => (
                            <PinCard key={pin.id} pin={pin} />
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(2 * columnLength, 3 * columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} />
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(3 * columnLength, 4 * columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} />
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(4 * columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} />
                        ))}
                    </ul>
                    
                </div>
                </>
            ) : (
                <></>
            )}
            
        </>
    )
}

export default AllPinsIndex