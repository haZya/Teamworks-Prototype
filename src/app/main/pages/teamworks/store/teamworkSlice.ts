import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import ITeamwork from 'models/Teamwork';
import { RootStateOrAny } from 'react-redux';

export const getTeamwork = createAsyncThunk<ITeamwork, { teamworksId: string | number }>(
	'teamworksPage/teamworks/getTeamwork',
	async params => {
		const response = await axios.get('/api/teamworks/teamwork', { params });
		const data = await response.data;
		return data;
	}
);

export const updateTeamworkTitle = createAsyncThunk<string, string, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkTitle',
	async (title, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/title', { id, title });
		const data: string = await response.data;

		dispatch(showMessage({ message: 'Teamwork Title Saved' }));
		dispatch(getTeamwork({ teamworksId: id }));

		return data;
	}
);

export const updateTeamworkDescription = createAsyncThunk<string, string, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkTitle',
	async (description, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/description', { id, description });
		const data: string = await response.data;

		dispatch(showMessage({ message: 'Teamwork Description Saved' }));
		dispatch(getTeamwork({ teamworksId: id }));

		return data;
	}
);

export const updateTeamworkCategory = createAsyncThunk<string, string, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkCategory',
	async (category, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/category', { id, category });
		const data: string = await response.data;

		dispatch(showMessage({ message: 'Teamwork Category Saved' }));
		dispatch(getTeamwork({ teamworksId: id }));

		return data;
	}
);

export const updateTeamworkPriority = createAsyncThunk<string, string, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkPriority',
	async (priority, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/priority', { id, priority });
		const data: string = await response.data;

		dispatch(showMessage({ message: 'Teamwork Priority Saved' }));
		dispatch(getTeamwork({ teamworksId: id }));

		return data;
	}
);

export const updateTeamworkStartDate = createAsyncThunk<string, string, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkStartDate',
	async (startDate, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/startDate', { id, startDate });
		const data: string = await response.data;

		dispatch(showMessage({ message: 'Teamwork Start Date Saved' }));
		dispatch(getTeamwork({ teamworksId: id }));

		return data;
	}
);

export const updateTeamworkDueDate = createAsyncThunk<string, string, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkDueDate',
	async (dueDate, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/dueDate', { id, dueDate });
		const data: string = await response.data;

		dispatch(showMessage({ message: 'Teamwork Due Date Saved' }));
		dispatch(getTeamwork({ teamworksId: id }));

		return data;
	}
);

export const updateTeamwork = createAsyncThunk<ITeamwork, ITeamwork, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamwork',
	async (_data, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update', { id, _data });
		const data = await response.data;

		dispatch(showMessage({ message: 'Teamwork Saved' }));

		return data;
	}
);

const teamworkSlice = createSlice({
	name: 'teamworksPage/teamwork',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getTeamwork.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamworkTitle.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamworkDescription.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamworkCategory.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamworkPriority.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamworkStartDate.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamworkDueDate.fulfilled.type]: (state: RootStateOrAny, action) => action.payload,
		[updateTeamwork.fulfilled.type]: (state: RootStateOrAny, action) => ({
			...state,
			...action.payload
		})
	}
});

export default teamworkSlice.reducer;
