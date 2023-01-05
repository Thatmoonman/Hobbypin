import { Link } from "react-router-dom"
import { Modal } from "../../context/Modal"
import './AboutModal.css'

const AboutModal = (props) => {
    const setShowAboutModal = props.setShowAboutModal

    const aboutMeOne = "My name is Justin Kilburn. I am a fullstack developer who has been coding since 2022. I live in Brooklyn, NY and came into the field after working in hospitality for a over a decade. I enjoy the combination of design mixed with problem solving. Pinterest presented a fun design challenge for me and I hope you enjoy playing around with making some inspiring boards!"
    const aboutMeTwo = "Welcome to Hobbypin, my clone of Pinterest. Pinterest is website for idea visualization that allows the user to group different pictures with descriptions (called 'pins') within 'boards'. These 'boards' serve as a place to keep all of these 'pins' together so they can be viewed any user. Hobbypin is also a place for keeping what inspires you organized and in one place."

    return (
        <Modal onClose={() => setShowAboutModal(false)}>
            <div className="aboutModal" onClick={() => setShowAboutModal(false) }>
                <h1>ABOUT THE DEVELOPER:</h1>
                <p>{aboutMeOne}</p>
                <h1>ABOUT THE PROJECT:</h1>
                <p>{aboutMeTwo}</p>
                <div className="aboutButtonBox">
                    <Link to={{pathname: "https://github.com/Thatmoonman"}} target="_blank" className='externalLink'><i className="fa-brands fa-github"></i></Link>
                    <Link to={{pathname: "https://www.linkedin.com/in/justin-kilburn-3aa38a54/"}} target="_blank"className='externalLink'><i className="fa-brands fa-linkedin"></i></Link>
                    <Link to={{pathname: "https://angel.co/u/justin-kilburn"}} target="_blank"className='externalLink'><i class="fa-brands fa-angellist"></i></Link>
                </div>
            </div>
        </Modal>
    )
}

export default AboutModal