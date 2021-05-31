import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IUser from 'models/User';

export const getUsers = createAsyncThunk<IUser[]>('teamApp/items/getUsers', async () => {
	const response = await axios.get('/api/users', {
		params: {}
	});
	const data: IUser[] = await response.data;

	return data;
});

const itemSlice = createSlice({
	name: 'teamApp/team',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getUsers.fulfilled.type]: (state, action: PayloadAction<void>) => action.payload
	}
});

export default itemSlice.reducer;
