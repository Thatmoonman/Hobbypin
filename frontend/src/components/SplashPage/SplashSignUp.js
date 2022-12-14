import SignupFormPage from "../SignupFormModal/SignupForm"

const SplashSignUp = (props) => {
    const handleClickUp = props.handleClickUp

    return (
        <div className="snap splashContainer splashSignup" >
            <div className="circleUp" onClick={handleClickUp}><i className="fa-solid fa-chevron-up"></i></div>
            <h1>Sign up to get your ideas</h1>
            <div></div>
            <div className="splashSignupModal">
                <SignupFormPage />
            </div>
        </div>
    )
}

export default SplashSignUp