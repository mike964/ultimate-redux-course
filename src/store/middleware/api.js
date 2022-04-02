import axios from 'axios'
import * as actions from '../api'

// * Sample Action
// const action = {
// 	type: 'apiCallBegan',
// 	payload: {
// 		url: '/bugs',
// 		method: 'get',
// 		data: {},
// 		onSuccess: 'bugsReceived',
// 		onError: 'apiRequestFailed',
// 	},
// }

const api = store => next => async action => {
	if (action.type !== actions.apiCallBegan.type) return next(action)

	const { url, method, data, onStart, onSuccess, onError } = action.payload

	if (onStart) store.dispatch({ type: onStart })

	next(action)

	try {
		const response = await axios.request({
			baseURL: 'http://localhost:9001/api',
			url, // bugs
			method,
			data,
		})
		// * General Success Action
		store.dispatch(actions.apiCallSuccess(response.data))
		// * Specific
		if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data })
	} catch (error) {
		// * General Error Action
		dispatch(actions.apiCallFailed(error.message))
		// * Specific Error
		if (onError) store.dispatch({ type: onError, payload: error.message })
	}
}

export default api
