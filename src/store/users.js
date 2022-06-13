import { createSlice } from '@reduxjs/toolkit'

let lastId = 0

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		userAdded: (users, action) => {
			users.push({
				id: ++lastId,
				name: action.payload.name,
			})
		},
	},
})

export const { userAdded } = usersSlice.actions

export default usersSlice.reducer
