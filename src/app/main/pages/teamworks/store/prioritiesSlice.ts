import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPriority } from 'models/Teamwork';
import { RootStateOrAny } from 'react-redux';

export const getPriorities = createAsyncThunk<IPriority[]>('teamworksPage/priorities/getPriorities', async () => {
	const response = await axios.get('/api/teamworks/priorities');
	const data: IPriority[] = await response.data;

	return data;
});

const prioritiesAdapter: EntityAdapter<IPriority> = createEntityAdapter({});

export const { selectAll: selectPriorities, selectById: selectPriorityById } = prioritiesAdapter.getSelectors(
	(state: RootStateOrAny) => state.teamworksPage.priorities
);

const prioritySlice = createSlice({
	name: 'teamworksPage/priorities',
	initialState: prioritiesAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getPriorities.fulfilled.type]: prioritiesAdapter.setAll
	}
});

export default prioritySlice.reducer;
