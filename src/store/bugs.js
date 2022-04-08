import {
	// createAction, createReducer,
	createSlice,
} from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { apiCallBegan } from './api'
import moment from 'moment'

let lastId = 0 //  last bug id

// createSlice() automatically creates action types and action creators
// which means we don't need to call createAction() and createReducer()
// We need to export slice.reducer and actions
const slice = createSlice({
	name: 'bugs',
	initialState: {
		list: [],
		loading: false,
		lastFetch: null, // To perevent calling the server each time page loades
	},
	reducers: {
		// actions => action handlers
		bugsRequested: (bugs, action) => {
			bugs.loading = true
		},
		// bugs/bugsReceived
		bugsReceived: (bugs, action) => {
			bugs.list = action.payload
			bugs.loading = false
			bugs.lastFetch = Date.now()
		},
		bugsRequestFailed: (bugs, action) => {
			bugs.loading = false
		},
		bugAdded: (bugs, action) => {
			// bugs = state
			// bugs.list.push({
			// 	id: ++lastId,
			// 	description: action.payload.description,
			// 	resolved: false,
			// })
			bugs.list.push(action.payload)
		},
		bugResolved: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
			bugs.list[index].resolved = true
		},
		// Assign bug to user id
		bugAssignedToUser: (bugs, action) => {
			const { bugId, userId } = action.payload
			const index = bugs.list.findIndex(bug => bug.id === bugId)
			bugs.list[index].userId = userId
		},
	},
})
// console.log(slice)

// * Action Creators
const url = '/bugs'

// Save bug to the server
export const addBug = bug =>
	apiCallBegan({
		url,
		method: 'post',
		data: bug,
		onSuccess: bugAdded.type,
	})

// * SELECTOR - filter state and return some part of the store.state

// * Memoization - fix expensive function like filter()
export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs,
	state => state.entities.projects,
	(bugs, projects) => bugs.list.filter(bug => !bug.resolved)
	// if bugs or projects remain unchanged, this logic not gona recalculate again
)

export const getBugsByUser = userId => {
	return createSelector(
		state => state.entities.bugs,
		bugs => bugs.list.filter(bug => bug.userId === userId)
	)
}

export const loadBugs = () => (dispatch, getState) => {
	// * Cashing - To perevent calling the server each time page loades
	const { lastFetch } = getState().entities.bugs

	// Calculate difference bw 2 time points
	const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
	console.log('diff in minutes :' + diffInMinutes)
	if (diffInMinutes < 10) return
	// If difference < 10 minutes, don't call server for 2nd time

	console.log(lastFetch)

	dispatch(
		apiCallBegan({
			url,
			onStart: bugsRequested.type,
			onSuccess: bugsReceived.type,
			onError: bugsRequestFailed.type,
		})
	)
}

export const {
	bugAdded,
	bugResolved,
	bugAssignedToUser,
	bugsReceived,
	bugsRequested,
	bugsRequestFailed,
} = slice.actions
export default slice.reducer

/*
- Memoization is a technique for optimizing expensive funtions
- we use reselect for memoization

*/
