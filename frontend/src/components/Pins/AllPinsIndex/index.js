import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { fetchBoards, getBoards } from "../../../store/board";
import { fetchAllPins, getPins } from "../../../store/pins";
import './AllPinsIndex.css'
import PinCard from "./PinCard";

const AllPinsIndex = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    const user = useSelector(state => state.session.user)
    const userId = user ? user.id : null
    
    const boards = useSelector(getBoards)
    
    useEffect(() => {
        dispatch(fetchBoards(userId))
    }, [dispatch, userId])
    
    const window = document.body
    const [windowWidth, setWindowWidth] = useState(window.clientWidth)
    
    useEffect(() => {
        setWindowWidth(window.clientWidth)
    }, [window.clientWidth])

    // window.addEventListener( 'resize', (e) => setWindowWidth(e.clientWidth))

    const columnNumber = () => {
        
        if (windowWidth > 1250) {
            return 5
        } else if (windowWidth < 1250 && windowWidth > 1000) {
            return 4
        } else {
            return 3
        }
    }
    const columnLength = Math.ceil(pins.length / columnNumber())
    
    useEffect(() => {
        dispatch(fetchAllPins())
    }, [dispatch])

    return (
        <>
            {user ? (
                <div className="pinIndexColumns">
                    <ul>
                        {pins.slice(0, columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} boards={boards} />
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(columnLength, columnLength * 2).map(pin => (
                            <PinCard key={pin.id} pin={pin} boards={boards}/>
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(2 * columnLength, 3 * columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} boards={boards}/>
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(3 * columnLength, 4 * columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} boards={boards}/>
                        ))}
                    </ul>
                    <ul>
                        {pins.slice(4 * columnLength).map(pin => (
                            <PinCard key={pin.id} pin={pin} boards={boards}/>
                        ))}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default AllPinsIndex