import { useEffect, useState } from "react"
import './Splash.css'
import FoodPage from "./Food"
import TravelPage from "./Travel"


const SplashPage = () => {

    const [currentPage, setCurrentPage] = useState("food")
    const [time, setTime] = useState(0)
    setTimeout(() => setTime(time + 1), 1000)

    useEffect(() => {}, [currentPage])
    setTimeout(() => {
        if (currentPage === "food") {
            setCurrentPage("travel")
        } else if (currentPage === 'travel') {
            setCurrentPage("food")
        }
        
    }, 10000)


    return (
        <>
            {currentPage === "food" && <FoodPage />}
            {currentPage === "travel" && <TravelPage />}
            {time}
        </>
    )
}

export default SplashPage