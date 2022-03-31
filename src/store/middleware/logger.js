// const logger = (store, next, action) => {
// * Currying
const logger = store => next => action => {
	// const logger = ({getState, dispatch}) => next => action => {
	console.log('store', store)
	console.log('next', next)
	console.log('action', action)
	next(action)
}

export default logger

// SNA - store, next , action
