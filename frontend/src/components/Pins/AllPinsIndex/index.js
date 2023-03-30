import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { fetchBoards, getBoards } from "../../../store/board";
import { fetchAllPins, getPins } from "../../../store/pins";
import SplashPage from "../../SplashPage";
import './AllPinsIndex.css'
import MobileAllPinsIndex from "./MobileAllPinsIndex";
import PinCard from "./PinCard";

const AllPinsIndex = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    
    const isMobile = /Android|iPhone/i.test(navigator.userAgent)
    
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
        if (userId) dispatch(fetchBoards(userId))
    }, [userId])
    
    useEffect(() => {
        dispatch(fetchAllPins())
    }, [])

    return (
        <>
            {currentUser ? (
                <>
                {isMobile ? (
                    <MobileAllPinsIndex allPins={allPins} boards={boards}/>
                ) : (
                    <>
                    {loading &&
                            <div className="loader">
                                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                    }
                        <div className="pinIndexColumns">
                            <ul>
                                {allPins.map(pin => 
                                    <PinCard key={pin.id} pin={pin} boards={boards} /> 
                                )}
                            </ul>
                        </div>
                    </>
                )}
                </>
            ) : (
                <>
                    <SplashPage />
                </>
            )}
        </>
    )
}

export default AllPinsIndex