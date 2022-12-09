import csrfFetch from './csrf.js'

export const RECEIVE_PINS = '/pins/RECEIVE_PINS'
export const RECEIVE_PIN = '/pins/RECEIVE_PIN'

const receivePin = (pin) => ({
    type: RECEIVE_PIN,
    pin
})

const receivePins = (pins) => ({
    type: RECEIVE_PINS,
    pins
})

export const getPins = (state) => (
    state.pins ? Object.values(state.pins) : []
)

export const getPin = (pinId) => (state) => (
    state.pins[pinId] ? state.pins[pinId] : {}
)

export const fetchAllPins = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users/all/pins/`)
    if (res.ok) {
        const data = await res.json()
        dispatch(receivePins(data))
    }
}

export const fetchUsersPins = (uploaderId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${uploaderId}/pins`)

    if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(receivePins(data))
    }
}

const pinsReducer = (state={}, action) => {
    Object.freeze(state)
    const nextState = { ...state }
    
    switch (action.type) {
        case RECEIVE_PIN:
            nextState[action.pin.id] = action.pin
            return nextState
        case RECEIVE_PINS:
            return { ...nextState, ...action.pins }
        default:
            return state
    }
}

export default pinsReducer