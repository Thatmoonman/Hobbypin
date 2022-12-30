import csrfFetch from './csrf'

export const RECEIVE_BOARD = 'boards/RECEIVE_BOARD'
export const RECEIVE_BOARDS = 'boards/RECEIVE_BOARDS'
export const REMOVE_BOARD = 'board/REMOVE_BOARD'

const receiveBoard = (board) => ({
    type: RECEIVE_BOARD,
    board
})

const receiveBoards = (boards) => ({
    type: RECEIVE_BOARDS,
    boards
})

const removeBoard = (boardId) => ({
    type: REMOVE_BOARD,
    boardId
})

export const getBoard = (boardId) => (state) => (
    state.boards[boardId] ? state.boards[boardId] : {}
)

export const getBoards = (state) => (
    state.boards ? Object.values(state.boards) : []
)

export const fetchBoard = (userId, boardId) => async (dispatch) => {
    let res
    try {
        res = await csrfFetch(`/api/users/${userId}/boards/${boardId}`)
    } catch(e) {
        return 
    }
    const data = await res.json()
    dispatch(receiveBoard(data.board))
    return data
}

export const fetchBoards = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/boards`)
    if (res.ok) {
        const data = await res.json()
        dispatch(receiveBoards(data))
        return data
    }
}

export const fetchPinBoards = (pinId) => async (dispatch) => {
    const res = await csrfFetch(`/api/pins/${pinId}/pinned_boards`)
    if (res.ok) {
        const data = await res.json()
        dispatch(receiveBoards(data))
        return data
    }
}

export const createBoard = (board) => async (dispatch) => {
    const {title, userId} = board
    const res = await csrfFetch(`/api/boards`, {
        method: 'POST',
        body: JSON.stringify({board: {title: title, userId: userId}})
    })
    const data = await res.json()
    dispatch(fetchBoard(data.board.userId, data.board.id))   
    return data.board
}

export const updateBoard = (board) => async (dispatch) => {
    const {title, description} = board
    const res = await csrfFetch(`/api/boards/${board.id}`, {
        method: 'PATCH',
        body: JSON.stringify({board: { ...board, title: title, description: description}})
    })
    const data = await res.json()
    dispatch(fetchBoard(data.board.userId, data.board.id))
    return data.board
}

export const deleteBoard = (boardId) => async (dispatch) => {
    await csrfFetch(`/api/boards/${boardId}`, { method: 'DELETE' })
    await dispatch(removeBoard(boardId))
}

const boardsReducer = (state={}, action) => {
    Object.freeze(state)
    const nextState = { ...state }

    switch (action.type) {
        case RECEIVE_BOARD:
            nextState[action.board.id] = action.board
            return nextState
        case RECEIVE_BOARDS:
            return { ...action.boards }
        case REMOVE_BOARD:
            delete nextState[action.boardId]
            return nextState
        default:
            return state
    }
}

export default boardsReducer