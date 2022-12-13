import csrfFetch from "./csrf"
import { fetchBoardPins } from "./pins"

export const createPinnedBoard = (pinId, boardId) => async () => {
    await csrfFetch(`/api/pinned_boards`, {
        method: 'POST',
        body: JSON.stringify({pinned_board: {pin_id: pinId, board_id: boardId}})
    })
}

export const removePinFromBoard = (pinId, boardId) => async (dispatch) => {
    await csrfFetch(`/api/pinned_boards?pin_id=${pinId}&board_id=${boardId}`, {method: 'DELETE'})
    dispatch(fetchBoardPins(boardId))
}