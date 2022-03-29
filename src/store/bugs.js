import { createAction, createReducer } from '@reduxjs/toolkit'

// Action Types
const BUG_ADDED = 'bugAdded'
const BUG_REMOVED = 'bugRemoved'
const BUG_RESOLVED = 'bugResolved'

// Action Creators
// export const bugAdded = description => ({
// 	type: BUG_ADDED,
// 	payload: {
// 		description,
// 	},
// })
export const bugAdded = createAction('bugAdded')
// console.log(bugAdded.type)

// export const bugRemoved = id => ({
// 	type: BUG_REMOVED,
// 	payload: {
// 		id,
// 	},
// })
export const bugRemoved = createAction('bugRemoved')

// export const bugResolved = id => ({
// 	type: BUG_RESOLVED,
// 	payload: {
// 		id,
// 	},
// })
export const bugResolved = createAction('bugResolved')

// * REDUX TOOLKIT
// const action = createAction('bugUpdated')
// console.log(action)
// console.log(action())

// * Reducer
let lastId = 0

export default createReducer([], {
	[bugAdded.type]: (bugs, action) => {
		// bugs = state
		bugs.push({
			id: ++lastId,
			description: action.payload.description,
			resolved: false,
		})
	},
	[bugResolved.type]: (bugs, action) => {
		const index = bugs.findIndex(bug => bug.id === action.payload.id)
		bugs[index].resolved = true
	},
})

// * OLD REDUCER (before createReducer)
// export default function reducer(state = [], action) {
// 	switch (action.type) {
// 		// case BUG_ADDED:
// 		case bugAdded.type:
// 			return [
// 				...state,
// 				{
// 					id: ++lastId,
// 					description: action.payload.description,
// 					resolved: false,
// 				},
// 			]
// 		// case BUG_REMOVED:
// 		case bugRemoved.type:
// 			return state.filter(bug => bug.id !== action.payload.id)

// 		// case BUG_RESOLVED:
// 		case bugResolved.type:
// 			return state.map(bug =>
// 				bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
// 			)

// 		default:
// 			return state
// 	}
// }

// # RULES of DUCK PATTERN
/*
- Reducer should be default export of module
- 
*/

// HEELLLOOOO
