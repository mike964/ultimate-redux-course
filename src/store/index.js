import { devToolsEnhancer } from 'redux-devtools-extension'
import { createStore } from 'redux'
import reducer from './bugs'

// * Configure store
export default function configureStore() {
	const store = createStore(
		reducer /* preloadedState, */,
		devToolsEnhancer({
			trace: true,
		})
	)

	return store
}

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
