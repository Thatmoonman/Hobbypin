import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { fetchBoards, getBoards } from '../../../store/board';
import './BoardIndex.css'
import BoardIndexItem from './BoardIndexItem';

const BoardIndex = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const boards = useSelector(getBoards)

    useEffect(() => {
        dispatch(fetchBoards(userId))
    },[userId])

    const showBoards = () => (
        <ul className='boardIdx'>
            {boards.map((board) => <BoardIndexItem key={board.id} board={board}/>)}       
        </ul>
    )

    return (
        <div className="profile profileBoardIndex">
            <div className="boardIdxNav1">
                <div className="boardIdxNavItem1" to='/'>Created</div>
                <div className="boardIdxNavItem1" to='/'>Saved</div>
            </div>
            <div className="boardIdxNav2">
                <div className="boardIdxNavItem2"><i className="fa-solid fa-sliders"></i></div>
                <div className="boardIdxNavItem2"><i className="fa-solid fa-plus"></i></div>
            </div>
            <div>{showBoards()}</div>
        </div>
    )

}

export default BoardIndex