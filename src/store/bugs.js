import {
	// createAction, createReducer,
	createSlice,
} from '@reduxjs/toolkit'

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
	},
})
console.log(slice)

export const { bugAdded, bugResolved } = slice.actions
export default slice.reducer

// * 7.6 - Select unresolved bugs
export const getUnresolvedBugs = state =>
	state.entities.bugs.filter(bug => !bug.resolved)
