import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom';
import { fetchBoards, getBoards } from '../../../store/board';
import CreateDropdown from '../../Navigation/CreateDropdown';
import CreateBoard from '../CreateBoardModal';
import './BoardIndex.css'
import BoardIndexItem from './BoardIndexItem';
import CreateButtonDropdown from './CreatePBButtonDropdown';

const BoardIndex = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const boards = useSelector(getBoards)

    const [showCreateDropdown, setShowCreateDropdown] = useState(false)
    const [showBoardModal, setShowBoardModal] = useState(false)

    useEffect(() => {
        dispatch(fetchBoards(userId))
    },[userId])

    const showBoards = () => (
        <ul className='boardIdxContainer'>
            <Link className='boardIdxItem' to={`/users/${userId}/pins`}><p>All Pins</p></Link>
            {boards.map((board) => <BoardIndexItem key={board.id} board={board}/>)}       
        </ul>
    )

    const toggleCreateDropdown = () => {
        showCreateDropdown ? setShowCreateDropdown(false) : setShowCreateDropdown(true)
    }

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
            <div>{showBoards()}</div>
        </div>
    )

}

export default BoardIndex