import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import ITeamwork from 'models/Teamwork';
import { RootStateOrAny } from 'react-redux';

export const getTeamworks = createAsyncThunk<ITeamwork[]>('teamworksPage/categories/getTeamworks', async () => {
	const response = await axios.get('/api/teamworks');
	const data: ITeamwork[] = await response.data;

	return data;
});

const teamworksAdapter: EntityAdapter<ITeamwork> = createEntityAdapter({});

export const { selectAll: selectTeamworks, selectById: selectTeamworkById } = teamworksAdapter.getSelectors(
	(state: RootStateOrAny) => state.teamworksPage.teamworks
);

export interface IInitialState {
	searchText: string;
}

const initialtState: IInitialState = {
	searchText: ''
};

const teamworksSlice = createSlice({
	name: 'teamworksPage/teamworks',
	initialState: teamworksAdapter.getInitialState(initialtState),
	reducers: {
		setTeamworksSearchText: (state, action) => {
			state.searchText = action.payload;
		}
	},
	extraReducers: {
		[getTeamworks.fulfilled.type]: teamworksAdapter.setAll
	}
});

export const { setTeamworksSearchText } = teamworksSlice.actions;

export default teamworksSlice.reducer;
