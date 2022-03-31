// import * as tvActions from './store/module';

import configureStore from './store'
import {
	bugAdded,
	bugResolved,
	bugAssignedToUser,
	getUnresolvedBugs,
	getBugsByUser,
} from './store/bugs'
import { projectAdded } from './store/projects'
import { userAdded } from './store/users'

console.log('Hellooo..')

const store = configureStore()

store.subscribe(() => {
	console.log('Store changed!')
})

store.dispatch(userAdded({ name: 'User One' }))
store.dispatch(userAdded({ name: 'User Two' }))
store.dispatch(projectAdded({ name: 'Project one' }))
store.dispatch(projectAdded({ name: 'Project two' }))

// store.dispatch(addBug({ description: 'a' }))
// store.dispatch(bugAdded('Bug 1'))
store.dispatch(bugAdded({ description: 'Bug 1' }))
store.dispatch(bugAdded({ description: 'Bug 2' }))

store.dispatch(bugAdded('Bug 3'))
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }))
store.dispatch(bugResolved({ id: 2 }))

console.log(store.getState())

const x = getUnresolvedBugs(store.getState())
console.log(x)

const y = getBugsByUser(1)(store.getState())
console.log(y)

const z = getUnresolvedBugs(store.getState())

console.log(x === z)
