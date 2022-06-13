// import * as tvActions from './store/module';

import configureStore from './store'
import {
	bugAdded,
	bugAssignedToUser,
	bugResolved,
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

// store.dispatch(addBug({ description: 'a' }))
// store.dispatch(bugAdded('Bug 1'))
store.dispatch(bugAdded({ description: 'Bug 1' }))

store.dispatch(bugAdded('Bug 2'))

store.dispatch(bugResolved({ id: 2 }))

store.dispatch(projectAdded({ name: 'Project one' }))
store.dispatch(userAdded({ name: 'Mike' }))

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }))

console.log(store.getState())

// result1 : no selector
// const result1 = getUnresolvedBugs(store.getState())
// const result2 = getUnresolvedBugs(store.getState())
const result3 = getUnresolvedBugs(store.getState())

// console.log(result1)
// console.log(result2)
// console.log(result3)

// console.log(result1 === result2)

console.log(getBugsByUser(1)(store.getState()))
