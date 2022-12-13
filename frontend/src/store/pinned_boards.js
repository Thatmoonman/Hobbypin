import csrfFetch from "./csrf"

export const createPinnedBoard = (pinId, boardId) => async () => {
    const res = await csrfFetch(`/api/pinned_boards`, {
        method: 'POST',
        body: JSON.stringify({pinned_board: {pin_id: pinId, board_id: boardId}})
    })
}