import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom';
import { fetchUsersPins, getPins } from '../../../store/pins';
import { getUser } from '../../../store/user';
import CreateDropdown from '../../Navigation/CreateDropdown';
import CreatePinModal from '../../Pins/CreatePin';
import CreateBoard from '../CreateBoardModal';
import './BoardIndex.css'
import BoardIndexItems from './BoardIndexItems';
import CreateButtonDropdown from './CreatePBButtonDropdown';

const BoardIndex = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    const pins = useSelector(getPins)
    pins.filter(pin => pin.uploader_id === user.id)

    const [showCreateDropdown, setShowCreateDropdown] = useState(false)
    const [showBoardModal, setShowBoardModal] = useState(false)
    const [showPinModal, setShowPinModal] = useState(false)

    useEffect(() => {
        dispatch(fetchUsersPins(userId))
    },[userId])

    const toggleCreateDropdown = () => {
        showCreateDropdown ? setShowCreateDropdown(false) : setShowCreateDropdown(true)
    }
    
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) return <Redirect to="/" />

    return (
        <div className="profile profileBoardIndex" >
            <div className="boardIdxNav1">
                {/* <div className="boardIdxNavItem1" to='/'>Created</div> */}
                {/* <div className="boardIdxNavItem1" to='/'>Saved</div> */}
            </div>
            <div className="boardIdxNav2">
                <div className='boardIdxNavItem2'></div>
                {/* <div className="boardIdxNavItem2"><i className="fa-solid fa-sliders"></i></div> */}
                <div className="boardIdxNavItem2" onClick={toggleCreateDropdown}><i className="fa-solid fa-plus"></i></div>
            </div>
            {showCreateDropdown && <CreateButtonDropdown  
                showCreateDropdown={showCreateDropdown}
                setShowCreateDropdown={setShowCreateDropdown} 
                setShowBoardModal={setShowBoardModal}
                setShowPinModal={setShowPinModal}/>
            }
            {showBoardModal && <CreateBoard setShowBoardModal={setShowBoardModal}/>}
            {showPinModal && <CreatePinModal setShowPinModal={setShowPinModal}/>
            }
            
            <ul className='boardIdxContainer'>
                <Link className='boardIdxItem' to={`/users/${userId}/pins`}>
                    <img src={user.profilePic} alt=""/>    
                    <h2>All Pins</h2>
                    <p>{pins.length} pins</p>
                </Link>
                <BoardIndexItems />
            </ul>
        </div>
    )

}

export default BoardIndex