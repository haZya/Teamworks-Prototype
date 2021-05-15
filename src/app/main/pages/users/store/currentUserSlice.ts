import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('usersPage/currentUser/getUserData', async () => {
	const response = await axios.get('/api/current-user');
	const data = await response.data;
	return data;
});

const userSlice = createSlice({
	name: 'usersPage/currentUser',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getUserData.fulfilled.type]: (state, action) => action.payload
	}
});

export default userSlice.reducer;
