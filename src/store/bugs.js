import {
	// createAction, createReducer,
	createSlice,
} from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

let lastId = 0 //  last bug id

// createSlice() automatically creates action types and action creators
// which means we don't need to call createAction() and createReducer()
// We need to export slice.reducer and actions
const slice = createSlice({
	name: 'bugs',
	initialState: [],
	reducers: {
		// actions => action handlers
		bugAdded: (bugs, action) => {
			// bugs = state
			bugs.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			})
		},
		bugResolved: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.id)
			bugs[index].resolved = true
		},
		// Assign bug to user id
		bugAssignedToUser: (bugs, action) => {
			const { bugId, userId } = action.payload
			const index = bugs.findIndex(bug => bug.id === bugId)
			bugs[index].userId = userId
		},
	},
})
// console.log(slice)

// * SELECTOR - filter state and return some part of the store.state
// export const getUnresolvedBugs = state =>
// 	state.entities.bugs.filter(bug => !bug.resolved)

// * Memoization - fix expensive function like filter()
export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs,
	state => state.entities.projects,
	(bugs, projects) => bugs.filter(bug => !bug.resolved)
	// if bugs or projects remain unchanged, this logic not gona recalculate again
)

export const getBugsByUser = userId =>
	createSelector(
		state => state.entities.bugs,
		bugs => bugs.filter(bug => bug.userId === userId)
	)

export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions
export default slice.reducer

/*
- Memoization is a technique for optimizing expensive funtions
- we use reselect for memoization

*/
