import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"

const MobileSplashPage = () => {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    // <div className='navBarMobile snap'>
    //                 //     <div className='topNav'>
    //                 //         <NavLink exact to="/" className="logoNavLink logoNavLinkMobile"><img src="./Hobbypinlogo.png" alt=""/></NavLink>
    //                 //         <div className='rightNav'>
    //                 //             <LoginFormModal />
    //                 //             <SignupFormModal />
    //                 //         </div>
    //                 //     </div>
    //                 //     <div className='externalLinks externalLinksMobile'>
    //                 //         <div className='externalLink' onClick={() => setShowAboutModal(true)}>About</div>
    //                 //         <Link to={{pathname: "https://github.com/Thatmoonman"}} target="_blank" className='externalLink'>Github</Link>
    //                 //         <Link to={{pathname: "https://www.linkedin.com/in/justin-kilburn-3aa38a54/"}} target="_blank"className='externalLink'>LinkedIn</Link>
    //                 //     </div>
    //                 //     {showAboutModal && <AboutModal setShowAboutModal={setShowAboutModal} />}
    //                 // </div >

    return (
        <div className="mobileSplashContainer" >
            <img src="./Hobbypinlogo_nobackground.png" alt="" className="mobileLogo"/>
            <h1>Welcome to Hobbypin</h1>
            <LoginFormModal />
            <br></br>
            <SignupFormModal />
        </div>
    )
}

export default MobileSplashPage