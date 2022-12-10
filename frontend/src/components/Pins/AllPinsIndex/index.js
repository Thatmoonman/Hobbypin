import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { fetchAllPins, getPins } from "../../../store/pins";
import './AllPinsIndex.css'
import PinCard from "./PinCard";

const AllPinsIndex = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    const user = useSelector(state => state.session.user)
    console.log(user)

    useEffect(() => {
        dispatch(fetchAllPins())
    }, [])

    return (
        <>
            {user ? (
                <>
                <div>ALL PINS INDEX</div>
                <ul>
                    {pins.map(pin => (
                        <PinCard key={pin.id} pin={pin} />
                    ))}
                </ul>
                </>
            ) : (
                <></>
            )}
            
        </>
    )
}

export default AllPinsIndex