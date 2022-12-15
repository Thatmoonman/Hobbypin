

const CommentsIndexItem = (props) => {
    const comment = props.comment

    return (
        <>
            <p>{comment.text}</p>
        </>
    )
}

export default CommentsIndexItem