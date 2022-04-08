// import * as tvActions from './store/module';

import configureStore from './store'
import { apiCallBegan } from './store/api'
import { addBug, loadBugs } from './store/bugs'
// import {
// 	bugAdded,
// 	bugResolved,
// 	bugAssignedToUser,
// 	getUnresolvedBugs,
// 	getBugsByUser,
// } from './store/bugs'
// import { projectAdded } from './store/projects'
// import { userAdded } from './store/users'

console.log('Hellooo..')

const store = configureStore()

store.subscribe(() => {
	console.log('Store changed!')
})

// store.dispatch(userAdded({ name: 'User One' }))
// store.dispatch(userAdded({ name: 'User Two' }))
// store.dispatch(projectAdded({ name: 'Project one' }))
// store.dispatch(projectAdded({ name: 'Project two' }))

// // store.dispatch(addBug({ description: 'a' }))
// // store.dispatch(bugAdded('Bug 1'))
// store.dispatch(bugAdded({ description: 'Bug 1' }))
// store.dispatch(bugAdded({ description: 'Bug 2' }))

// store.dispatch(bugAdded('Bug 3'))
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }))
// store.dispatch(bugResolved({ id: 2 }))

// console.log(store.getState())

// const x = getUnresolvedBugs(store.getState())
// console.log(x)

// const y = getBugsByUser(1)(store.getState())
// console.log(y)

// const z = getUnresolvedBugs(store.getState())

// console.log(x === z)

// store.dispatch((dispatch, getState) => {
// 	// Call an API when the promise is resolved => dispatch()
// 	dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] })
// 	console.log(getState())
// })

// store.dispatch({
// 	type: 'error',
// 	payload: { message: 'An error occured.' },
// })

// store.dispatch({
// 	type: 'apiCallBegan',
// 	payload: {
// 		url: '/bugs',
// 		onSuccess: 'bugsReceived',
// 		onError: 'apiRequestFailed',
// 	},
// })

// * Simpler Version
// store.dispatch(
// 	apiCallBegan({
// 		url: '/bugs',
// 		onSuccess: 'bugs/bugsReceived',
// 	})
// )

// UI Layer

store.dispatch(addBug({ description: 'new bug ' }))
store.dispatch(loadBugs())

setTimeout(() => {
	store.dispatch(loadBugs())
}, 3000)
