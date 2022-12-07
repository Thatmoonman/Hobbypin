
import csrfFetch from './csrf';
import { updateCurrentUser } from './session';

export const RECEIVE_USER = 'users/RECEIVE_USER'

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`)
    const data = await res.json()
    dispatch(receiveUser(data))
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
        default:
            return state
    }
}

export default usersReducer
