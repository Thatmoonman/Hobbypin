
const BoardIndexItem = (props) => {
    const board = props.board

    return (
        <li key={board.id} className="boardIdxItem">
            {board.title}
        </li>
    )
}

export default BoardIndexItem