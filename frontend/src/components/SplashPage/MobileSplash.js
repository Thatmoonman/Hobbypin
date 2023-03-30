import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"

const MobileSplashPage = () => {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })

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