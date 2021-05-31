import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { IStatus } from 'models/Teamwork';
import { RootStateOrAny } from 'react-redux';

export const getStatuses = createAsyncThunk<IStatus[]>('teamworksPage/statuses/getStatuses', async () => {
	const response = await axios.get('/api/teamworks/statuses');
	const data: IStatus[] = await response.data;

	return data;
});

const statusesAdapter: EntityAdapter<IStatus> = createEntityAdapter({});

export const { selectAll: selectStatuses, selectById: selectCategoryById } = statusesAdapter.getSelectors(
	(state: RootStateOrAny) => state.teamworksPage.statuses
);

const statusSlice = createSlice({
	name: 'teamworksPage/statuses',
	initialState: statusesAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getStatuses.fulfilled.type]: statusesAdapter.setAll
	}
});

export default statusSlice.reducer;
