import history from '@history';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import ITeamwork from 'models/Teamwork';
import { RootStateOrAny } from 'react-redux';
import { getTeamworks } from './teamworksSlice';

export const getTeamwork = createAsyncThunk<ITeamwork, { teamworksId: string | number }>(
	'teamworksPage/teamworks/getTeamwork',
	async params => {
		const response = await axios.get('/api/teamworks/teamwork', { params });
		const data: ITeamwork = await response.data;
		return data;
	}
);

export const addTeamwork = createAsyncThunk<ITeamwork, ITeamwork, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/addTeamwork',
	async (_data, { dispatch }) => {
		const response = await axios.post('/api/teamworks/save', _data);
		const data: ITeamwork = await response.data;

		dispatch(showMessage({ message: 'Teamwork Saved' }));
		dispatch(getTeamworks());

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

export const updateTeamworkStartDate = createAsyncThunk<Date, Date, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkStartDate',
	async (startDate, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/startDate', { id, startDate });
		const data: Date = await response.data;

		dispatch(showMessage({ message: 'Teamwork Start Date Saved' }));
		dispatch(getTeamwork({ teamworksId: id }));

		return data;
	}
);

export const updateTeamworkDueDate = createAsyncThunk<Date, Date, { state: RootStateOrAny }>(
	'teamworksPage/teamworks/updateTeamworkDueDate',
	async (dueDate, { getState, dispatch }) => {
		const { id }: ITeamwork = getState().teamworksPage.teamwork;

		const response = await axios.post('/api/teamworks/update/dueDate', { id, dueDate });
		const data: Date = await response.data;

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
		const data: ITeamwork = await response.data;

		dispatch(showMessage({ message: 'Teamwork Saved' }));

		return data;
	}
);

export const removeTeamwork = createAsyncThunk<string, string>(
	'teamworksPage/teamworks/removeTeamwork',
	async (id, { dispatch }) => {
		const response = await axios.post('/api/teamworks/remove', { id });
		const data: string = await response.data;

		dispatch(showMessage({ message: 'Teamwork Deleted' }));
		history.push('/teamworks');

		return data;
	}
);

const teamworkSlice = createSlice({
	name: 'teamworksPage/teamwork',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getTeamwork.fulfilled.type]: (state, action: PayloadAction<ITeamwork>) => action.payload,
		[addTeamwork.fulfilled.type]: (state, action: PayloadAction<ITeamwork>) => ({
			...state,
			...action.payload
		}),
		[updateTeamworkTitle.fulfilled.type]: (state, action: PayloadAction<string>) => action.payload,
		[updateTeamworkDescription.fulfilled.type]: (state, action: PayloadAction<string>) => action.payload,
		[updateTeamworkCategory.fulfilled.type]: (state, action: PayloadAction<string>) => action.payload,
		[updateTeamworkPriority.fulfilled.type]: (state, action: PayloadAction<string>) => action.payload,
		[updateTeamworkStartDate.fulfilled.type]: (state, action: PayloadAction<Date>) => action.payload,
		[updateTeamworkDueDate.fulfilled.type]: (state, action: PayloadAction<Date>) => action.payload,
		[updateTeamwork.fulfilled.type]: (state, action: PayloadAction<ITeamwork>) => ({
			...state,
			...action.payload
		}),
		[removeTeamwork.fulfilled.type]: (state, action: PayloadAction<string>) => action.payload
	}
});

export default teamworkSlice.reducer;
