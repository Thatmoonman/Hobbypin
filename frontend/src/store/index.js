import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import boardsReducer from './board'
import sessionReducer from './session'
import usersReducer from './user'
import pinsReducer from './pins'
import commentsReducer from './comment'

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  boards: boardsReducer,
  pins: pinsReducer,
  comments: commentsReducer
})

let enhancer

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    )
    return store
}

export default configureStore