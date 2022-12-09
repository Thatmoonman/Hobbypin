import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllPins, getPins } from "../../../store/pins";

const AllPinsIndex = () => {
    const dispatch = useDispatch();
    const pins = useSelector(getPins)
    console.log(pins)
    useEffect(() => {
        dispatch(fetchAllPins())
    }, [])

    return (
        <>
            <div>ALL PINS INDEX</div>
            <ul>
                {pins.map(pin => <li key={pin.id}>{pin.title}</li>)}
            </ul>
        </>
    )
}

export default AllPinsIndex