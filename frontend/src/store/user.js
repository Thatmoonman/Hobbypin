
import csrfFetch from './csrf';
import { updateCurrentUser } from './session';

export const RECEIVE_USER = 'users/RECEIVE_USER'
export const RECEIVE_USERS = 'users/RECEIVE_USERS'

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const getUser = (userId) => (state) => (
    state.users[userId] ? state.users[userId] : {}
)

export const getUsers = (state) => (
    state.users ? Object.values(state.users) : []
)

export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`)
    if (res.ok) {
        const data = await res.json()
        if (data.user) {
            dispatch(receiveUser(data.user))
            return data
        }
        return null
    }
}

export const fetchUsers = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users`)
    const data = await res.json()
    dispatch(receiveUsers(data))
    return data
}

export const updateUser = (user) => async (dispatch) => {
    const { username, email, age, firstName, lastName, about, imgUrl, website } = user
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            user: {
                username, 
                email, 
                age, 
                firstName, 
                lastName, 
                about, 
                imgUrl, 
                website
            }
    })
    })
    
    if (res.ok){
        const data = await res.json()
        dispatch(receiveUser(data))
        updateCurrentUser(data)
        return res
    }
}

const usersReducer = (state={}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_USER:
            newState[action.user.id] = action.user
            return newState
        case RECEIVE_USERS:
            return { ...newState, ...action.users }
        default:
            return state
    }
}

export default usersReducer
