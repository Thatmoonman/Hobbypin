import csrfFetch from "./csrf"

export const RECEIVE_PINNED_BOARD = 'pinnedBoard/RECEIVE_PINNED_BOARD'
export const RECEIVE_PINNED_BOARDS = 'pinnedBoard/RECEIVE_PINNED_BOARDS'
export const REMOVE_PINNED_BOARD = 'pinnedBoard/REMOVE_PINNED_BOARD'

const receivePinned = (pinned) => ({
    type: RECEIVE_PINNED_BOARD,
    pinned
})

const receiveAllPinned = (allPinned) => ({
    type: RECEIVE_PINNED_BOARDS,
    allPinned
})

const removePinned = (pinnedId) => ({
    type: RECEIVE_PINNED_BOARD,
    pinnedId
})

export const fetchpinBoards = (pinId) => async (dispatch) => {
    const res = await csrfFetch(`/api/pinned_boards/`)
}