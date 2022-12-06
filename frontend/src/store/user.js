

export const RECEIVE_USER = 'users/RECEIVE_USER'

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    const data = await res.json()
    console.log(data)
    dispatch(receiveUser(data))
    return data

}

const usersReducer = (state={}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_USER:
            newState[action.user.id] = action.user
            return newState
        default:
            return state
    }
}

export default usersReducer
