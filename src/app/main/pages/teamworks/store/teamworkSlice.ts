import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { RootStateOrAny } from 'react-redux';

export const getTeamwork = createAsyncThunk<any, { teamworksId: string | number }>(
	'teamworksPage/teamworks/getTeamwork',
	async params => {
		const response = await axios.get('/api/teamworks/teamwork', { params });
		const data = await response.data;
		return data;
	}
);

export const updateTeamwork = createAsyncThunk<any, any, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamwork',
	async (_data, { getState, dispatch }) => {
		const { id } = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update', { id, ..._data });
		const data = await response.data;

		dispatch(showMessage({ message: 'Teamwork Saved' }));

		return data;
	}
);

const teamworkAdapter = createEntityAdapter({});

export interface IInitialState {
	currentTab: number;
}

const initialtState: IInitialState = {
	currentTab: 0
};

const teamworkSlice = createSlice({
	name: 'teamworksPage/teamwork',
	initialState: teamworkAdapter.getInitialState(initialtState),
	reducers: {
		setCurrentTab: (state, action) => {
			state.currentTab = action.payload;
		}
	},
	extraReducers: {
		[getTeamwork.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamwork.fulfilled.type]: (state: RootStateOrAny, action) => ({
			...state,
			...action.payload
		})
	}
});

export const { setCurrentTab } = teamworkSlice.actions;

export default teamworkSlice.reducer;
