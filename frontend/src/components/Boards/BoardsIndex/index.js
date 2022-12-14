import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom';
import { fetchBoards, getBoards } from '../../../store/board';
import { fetchBoardPins, fetchUsersPins, getPins } from '../../../store/pins';
import { fetchUser, getUser } from '../../../store/user';
import CreateDropdown from '../../Navigation/CreateDropdown';
import CreateBoard from '../CreateBoardModal';
import './BoardIndex.css'
import BoardIndexItem from './BoardIndexItem';
import BoardIndexItems from './BoardIndexItems';
import CreateButtonDropdown from './CreatePBButtonDropdown';

const BoardIndex = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    // const boards = useSelector(getBoards)
    const pins = useSelector(getPins)

    const [showCreateDropdown, setShowCreateDropdown] = useState(false)
    const [showBoardModal, setShowBoardModal] = useState(false)

    useEffect(() => {
        // dispatch(fetchBoards(userId))
        dispatch(fetchUsersPins(userId))
    },[userId])

    // const showBoards = () => (
    //     boards.map(board => (
    //         <BoardIndexItem key={board.id} board={board}/> 
    //     ))
    // )

    const toggleCreateDropdown = () => {
        showCreateDropdown ? setShowCreateDropdown(false) : setShowCreateDropdown(true)
    }
    
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) return <Redirect to="/" />

    return (
        <div className="profile profileBoardIndex" >
            <div className="boardIdxNav1">
                <div className="boardIdxNavItem1" to='/'>Created</div>
                <div className="boardIdxNavItem1" to='/'>Saved</div>
            </div>
            <div className="boardIdxNav2">
                <div className="boardIdxNavItem2"><i className="fa-solid fa-sliders"></i></div>
                <div className="boardIdxNavItem2" onClick={toggleCreateDropdown}><i className="fa-solid fa-plus"></i></div>
            </div>
            {showCreateDropdown && <CreateButtonDropdown  
                showCreateDropdown={showCreateDropdown}
                setShowCreateDropdown={setShowCreateDropdown} 
                setShowBoardModal={setShowBoardModal}/>
            }
            {showBoardModal && <CreateBoard setShowBoardModal={setShowBoardModal}/>}
            
            <ul className='boardIdxContainer'>
                <Link className='boardIdxItem' to={`/users/${userId}/pins`}>
                    <img src={user.profilePic} alt=""/>    
                    <h2>All Pins</h2>
                    <p>{pins.length} pins</p>
                </Link>
                {/* {showBoards()}        */}
                <BoardIndexItems />
            </ul>
        </div>
    )

}

export default BoardIndex