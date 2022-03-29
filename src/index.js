// import * as tvActions from './store/module';

import configureStore from './store'
import { bugAdded, bugResolved } from './store/bugs'

console.log('Hellooo..')

const store = configureStore()

store.subscribe(() => {
	console.log('Store changed!')
})

// store.dispatch(addBug({ description: 'a' }))
store.dispatch(bugAdded('Bug 1'))

setTimeout(() => {
	store.dispatch(bugAdded('Bug 2'))
}, 2000)
setTimeout(() => {
	store.dispatch(bugResolved(2))
}, 2000)

console.log(store.getState())
