// import { devToolsEnhancer } from 'redux-devtools-extension'
// import { createStore } from 'redux'
import reducer from './bugs'
import { configureStore } from '@reduxjs/toolkit'

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
