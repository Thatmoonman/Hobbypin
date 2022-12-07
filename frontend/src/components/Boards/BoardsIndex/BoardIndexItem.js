
const BoardIndexItem = (props) => {
    const board = props.board

    return (
        <li className="boardIdxItem">
            <p>title: {board.title}</p>
            <p>user: {board.user_id}</p>
        </li>
    )
}

export default BoardIndexItem