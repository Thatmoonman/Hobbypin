import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBoards, getBoards } from "../../../store/board";
import { fetchAllPins, getPins } from "../../../store/pins";
import SplashPage from "../../SplashPage";
import './AllPinsIndex.css'
import PinCard from "./PinCard";

const AllPinsIndex = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    
    pins.forEach(pin => pin.order = Math.random())
    const allPins = pins.map(pin => pin)
    allPins.sort((pin1, pin2) => {
        if (pin1.order < pin2.order) {
            return -1
        } else if (pin1.order > pin2.order) {
            return 1
        } else {
            return 0
        }
    })

    const currentUser = useSelector(state => state.session.user)
    const userId = currentUser ? currentUser.id : null
    
    const boards = useSelector(getBoards)

    const [loading, setLoading] = useState(true)
    
    if (currentUser) setTimeout(() => setLoading(false), 3000)

    useEffect(() => {
        dispatch(fetchBoards(userId))
    }, [dispatch, userId])
    
    // const window = document.body
    // const [windowWidth, setWindowWidth] = useState(window.clientWidth)
    
    // useEffect(() => {
    //     setWindowWidth(window.clientWidth)
    // }, [window.clientWidth])

    // window.addEventListener( 'resize', (e) => setWindowWidth(e.clientWidth))

    // const columnNumber = () => {
        
    //     if (windowWidth > 1250) {
    //         return 5
    //     } else if (windowWidth < 1250 && windowWidth > 1000) {
    //         return 4
    //     } else {
    //         return 3
    //     }
    // }
    // const columnLength = Math.ceil(pins.length / columnNumber())
    
    useEffect(() => {
        dispatch(fetchAllPins())
    }, [dispatch])

    return (
        <>
            {currentUser ? (
                <>
                {loading &&
                        <div className="loader">
                            {/* <Modal> */}
                            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    {/* </Modal> */}
                        </div>
                }
                    <div className="pinIndexColumns">
                        <ul>
                            {allPins.map(pin => 
                                <PinCard key={pin.id} pin={pin} boards={boards} /> 
                            )}
                        </ul>
                        {/* <ul>
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
                        </ul> */}
                    </div>
                </>
            ) : (
                <>
                    <SplashPage setLoading={setLoading} />
                </>
            )}
        </>
    )
}

export default AllPinsIndex