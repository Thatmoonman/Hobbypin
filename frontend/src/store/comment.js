import csrfFetch from "./csrf"


export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
})

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})

export const getComment = (commentId) => (state) => (
    state.comments ? state.comments[commentId] : {}
)

export const getComments = (state) => (
    state.comments ? Object.values(state.comments) : []
)

export const fetchComments = (pinId) => async (dispatch) => {
    const res = await csrfFetch(`/api/pins/${pinId}/comments`)
    if (res.ok) {
        const data = await res.json()
        dispatch(receiveComments(data))
    }
}

export const createComment = (comment) => async (dispatch) => {
    const {text, commenterId, pinId} = comment
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            comment: {
                text: text,
                pin_id: pinId,
                commenter_id: commenterId
            }
        })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(receiveComments(data))
    }
}

export const updateComment = (comment) => async (dispatch) => {
    const {text} = comment
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            comment: {
                text: text,
            }
        })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(receiveComment(data.comment))
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    await csrfFetch(`/api/comments/${commentId}`, {method: 'DELETE'})
    await dispatch(removeComment(commentId))
}

const commentsReducer = (state={}, action) => {
    Object.freeze(state)
    const nextState = { ...state }

    switch (action.type) {
        case RECEIVE_COMMENT:
            nextState[action.comment.id] = action.comment
            return nextState
        case RECEIVE_COMMENTS:
            return { ...action.comments }
        case REMOVE_COMMENT:
            delete nextState[action.commentId]
            return nextState
        default:
            return state
    }
}

export default commentsReducer