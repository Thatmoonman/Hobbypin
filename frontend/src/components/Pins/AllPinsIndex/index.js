import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllPins, getPins } from "../../../store/pins";
import './AllPinsIndex.css'
import PinCard from "./PinCard";

const AllPinsIndex = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)

    useEffect(() => {
        dispatch(fetchAllPins())
    }, [])

    return (
        <>
            <div>ALL PINS INDEX</div>
            <ul>
                {pins.map(pin => (
                    <PinCard pin={pin} />
                ))}
            </ul>
        </>
    )
}

export default AllPinsIndex