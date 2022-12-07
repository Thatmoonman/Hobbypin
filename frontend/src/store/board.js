import csrfFetch from './csrf'

export const RECEIVE_BOARD = 'boards/RECEIVE_BOARD'
export const RECEIVE_BOARDS = 'boards/RECEIVE_BOARDS'

const receiveBoard = (board) => ({
    type: RECEIVE_BOARD,
    board
})

const receiveBoards = (boards) => ({
    type: RECEIVE_BOARDS,
    boards
})

export const getBoard = (boardId) => (state) => (
    state.boards ? state.boards[boardId] : null
)

export const getBoards = (state) => (
    state.boards ? Object.values(state.boards) : []
)

export const fetchBoard = (boardId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/:user_id/boards/${boardId}`)
    const data = await res.json()
    dispatch(receiveBoard(data))
    return res
}

export const fetchBoards = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users/:user_id/boards`)
    const data = await res.json()
    dispatch(receiveBoards(data))
    return res
}



const boardsReducer = (state={}, action) => {
    Object.freeze(state)
    const nextState = { ...state }

    switch (action.type) {
        case RECEIVE_BOARD:
            nextState[action.board.id] = action.board
            return nextState
        case RECEIVE_BOARDS:
            return { ...nextState, ...action.boards }
        default:
            return state
    }
}

export default boardsReducer