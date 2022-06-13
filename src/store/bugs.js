import {
	createSelector,
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
		bugAssignedToUser: (bugs, action) => {
			const { bugId, userId } = action.payload
			const index = bugs.findIndex(bug => bug.id === bugId)
			bugs[index].userId = userId
		},
	},
})
// console.log(slice)

export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions
export default slice.reducer

// * 7.6 - Select unresolved bugs
export const getUnresolvedBugs_ = state =>
	state.entities.bugs.filter(bug => !bug.resolved)

export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs,
	state => state.entities.projects,
	// * if input (line above not changed, line below will not be executed again.)
	// * selector will return the result form the cash
	// * the output of the two selectors will end up as the input of result function
	bugs => bugs.filter(bug => !bug.resolved)
	// (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

// Selector
export const getBugsByUser = userId =>
	createSelector(
		state => state.entities.bugs,
		bugs => bugs.filter(bug => bug.userId === userId)
	)
