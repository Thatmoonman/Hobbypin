import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoards, getBoards } from '../../../store/board';
import './BoardIndex.css'
import BoardIndexItem from './BoardIndexItem';

const BoardIndex = () => {
    const dispatch = useDispatch();
    const boards = useSelector(getBoards)

    useEffect(() => {
        dispatch(fetchBoards(boards))
    }, [])

    const showBoards = () => (
        <ul>
            {boards.map(board => <BoardIndexItem board={board}/>)}       
        </ul>
    )

    return (
        <div className="profile profileBoardIndex">
            <div className="boardIdxNav1">
                <button>Created</button>
                <button>Saved</button>
            </div>
            <div className="boardIdxNav2">
                <button>Sort</button>
                <button>Add</button>
            </div>
            <div className="boardIdx">{showBoards()}</div>
        </div>
    )

}

export default BoardIndex