import { Link } from "react-router-dom"
import { Modal } from "../../context/Modal"
import './AboutModal.css'

const AboutModal = (props) => {
    const setShowAboutModal = props.setShowAboutModal

    const aboutMeOne = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rutrum sapien ac erat tincidunt, vestibulum commodo tellus viverra. In sed blandit justo. Maecenas viverra metus at tellus efficitur viverra sit amet sed magna. Maecenas dapibus, orci non iaculis congue, lacus purus facilisis sem, in vulputate tortor neque ut lorem. Ut ut nunc sed erat elementum dictum. Sed tempor massa id augue tincidunt, quis malesuada sem placerat. Ut sit amet viverra arcu. Praesent a massa in tellus congue convallis. Cras leo nulla, maximus id mollis ac, aliquam ac dui. Etiam non elementum ex. Mauris pretium elementum commodo. Maecenas enim ligula, consequat id enim eu, efficitur venenatis urna. Duis interdum bibendum euismod. Pellentesque suscipit orci sed ultrices lobortis. Donec quis sem risus."
    const aboutMeTwo = "Vestibulum ac sodales sem, vehicula suscipit dolor. Nam ullamcorper turpis tortor, sit amet sodales velit rutrum vitae. Vestibulum congue arcu non finibus auctor. Donec aliquam arcu eu est venenatis pharetra. Etiam metus tortor, gravida rutrum mi ut, mattis volutpat magna. Curabitur molestie ultricies auctor. Vestibulum gravida sollicitudin aliquet. Curabitur ullamcorper odio orci, eu volutpat magna cursus sit amet. Nunc non risus ac justo euismod posuere non vitae augue. Ut eros enim, faucibus quis faucibus in, elementum id erat."

    return (
        <Modal onClose={() => setShowAboutModal(false)}>
            <div className="aboutModal" onClick={() => setShowAboutModal(false) }>
                <h1>ABOUT THE DEV</h1>
                <p>{aboutMeOne}</p>
                <p>{aboutMeTwo}</p>
                <div className="aboutButtonBox">
                    <Link to={{pathname: "https://github.com/Thatmoonman"}} target="_blank" className='externalLink'><i className="fa-brands fa-github"></i></Link>
                    <Link to={{pathname: "https://www.linkedin.com/in/justin-kilburn-3aa38a54/"}} target="_blank"className='externalLink'><i className="fa-brands fa-linkedin"></i></Link>
                </div>
            </div>
        </Modal>
    )
}

export default AboutModal