import { useEffect, useState } from "react"
import './Splash.css'
import FoodPage from "./Food"
import TravelPage from "./Travel"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllPins, getPins } from "../../store/pins"
import SaveIdeas from "./SaveIdeas"


const SplashPage = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState("food")
    const [time, setTime] = useState(0)
    setTimeout(() => setTime(time + 1), 1000)

    setTimeout(() => {
        if (currentPage === "food") {
            setCurrentPage("travel")
        } else if (currentPage === 'travel') {
            setCurrentPage("food")
        }
    }, 6000)

    const pins = useSelector(getPins)

    useEffect(() => {
        dispatch(fetchAllPins())
    }, [dispatch])


    return (
        <div className="scrollContainer">
            <>
                {currentPage === "food" && <FoodPage pins={pins}/>}
                {currentPage === "travel" && <TravelPage pins={pins}/>}
            </>
            <>
                <SaveIdeas pins={pins}/>
            </>
        </div>
    )
}

export default SplashPage