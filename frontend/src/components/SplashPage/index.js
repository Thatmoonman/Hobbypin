import { useEffect, useState } from "react"
import './Splash.css'
import FoodPage from "./Food"
import TravelPage from "./Travel"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllPins, getPins } from "../../store/pins"
import SaveIdeas from "./SaveIdeas"
import SplashSignUp from "./SplashSignUp"


const SplashPage = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState("food")
    
    const circle = document.getElementsByClassName("circleDown")[0]

    setTimeout(() => {
        if (currentPage === "food") {
            setCurrentPage("travel")
            if (circle) circle.style.backgroundColor = "orangered"
        } else if (currentPage === 'travel') {
            setCurrentPage("food")
            if (circle) circle.style.backgroundColor = "orchid"
        }
    }, 6000)

    const pins = useSelector(getPins)

    useEffect(() => {
        dispatch(fetchAllPins())
    }, [dispatch])

    const handleClickDown = (e) => {
        e.preventDefault();
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    }

    const handleClickUp = (e) => {
        e.preventDefault();
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }

    return (
        <div className="scrollContainer">
            {pins.length >= 20 &&
            <>
                <>
                    <div className="circleDown" onClick={handleClickDown}><i className="fa-solid fa-chevron-down"></i></div>
                    {currentPage === "food" && <FoodPage pins={pins}/>}
                    {currentPage === "travel" && <TravelPage pins={pins}/>}
                </>
                <>
                    <SaveIdeas pins={pins}/>
                </>
                <>
                    <SplashSignUp handleClickUp={handleClickUp}/>
                </>
            </>
            }
        </div>
    )
}

export default SplashPage