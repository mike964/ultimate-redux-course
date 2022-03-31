// import { devToolsEnhancer } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import bugsReducer from './bugs'
import projectsReducer from './projects'
import usersReducer from './users'
import logger from './middleware/logger'
import toast from './middleware/toast'

// * combine all reducers
const entities = combineReducers({
	// slices of the store
	bugs: bugsReducer,
	projects: projectsReducer,
	users: usersReducer,
})

const reducer = combineReducers({
	entities,
	// UI reducer
})

// Middleware
const func =
	({ dispatch, getState }) =>
	next =>
	action => {
		if (typeof action === 'function') action(dispatch, getState)
		else next(action)
	}

// * Configure store
export default function () {
	const store = configureStore({
		reducer /* preloadedState, */,
		// devToolsEnhancer({
		// 	trace: true,
		middleware: [...getDefaultMiddleware(), logger, toast],
	})

	return store
}

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
