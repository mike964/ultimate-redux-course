// import * as tvActions from './store/module';

import configureStore from './store'
import { bugAdded, bugResolved } from './store/bugs'
import { projectAdded } from './store/projects'

console.log('Hellooo..')

const store = configureStore()

store.subscribe(() => {
	console.log('Store changed!')
})

// store.dispatch(addBug({ description: 'a' }))
store.dispatch(bugAdded('Bug 1'))
store.dispatch(bugAdded({ description: 'Bug 1' }))

setTimeout(() => {
	store.dispatch(bugAdded('Bug 2'))
}, 2000)
setTimeout(() => {
	store.dispatch(bugResolved({ id: 2 }))
}, 2000)

setTimeout(() => {
	store.dispatch(projectAdded({ name: 'Project one' }))
}, 2000)

console.log(store.getState())
