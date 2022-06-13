// import { devToolsEnhancer } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import bugsReducer from './bugs'
import projectReducer from './projects'
import usersRedcuer from './users'

// * combine all reducers
const entities = combineReducers({
	// slices of the store
	bugs: bugsReducer,
	projects: projectReducer,
	users: usersRedcuer,
})

const reducer = combineReducers({
	entities,
	// UI reducer
})

// * Configure store
export default function () {
	const store = configureStore({
		reducer /* preloadedState, */,
		// devToolsEnhancer({
		// 	trace: true,
	})

	return store
}

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
