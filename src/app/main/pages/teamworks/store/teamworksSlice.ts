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
	orderBy: string;
	orderDescending: boolean;
	selectedCategory: string;
	selectedStartDate: Date | null;
	selectedDueDate: Date | null;
	selectedPriority: string;
}

const initialtState: IInitialState = {
	searchText: '',
	orderBy: '',
	orderDescending: false,
	selectedCategory: 'all',
	selectedStartDate: null,
	selectedDueDate: null,
	selectedPriority: 'all'
};

const teamworksSlice = createSlice({
	name: 'teamworksPage/teamworks',
	initialState: teamworksAdapter.getInitialState(initialtState),
	reducers: {
		setTeamworksSearchText: (state, action) => {
			state.searchText = action.payload;
		},
		toggleOrderDescending: state => {
			state.orderDescending = !state.orderDescending;
		},
		changeOrder: (state, action) => {
			state.orderBy = action.payload;
		},
		setSelectedCategory: (state, action) => {
			state.selectedCategory = action.payload;
		},
		setSelectedStartDate: (state, action) => {
			state.selectedStartDate = action.payload;
		},
		setSelectedDueDate: (state, action) => {
			state.selectedDueDate = action.payload;
		},
		setSelectedPriority: (state, action) => {
			state.selectedPriority = action.payload;
		}
	},
	extraReducers: {
		[getTeamworks.fulfilled.type]: teamworksAdapter.setAll
	}
});

export const {
	setTeamworksSearchText,
	toggleOrderDescending,
	changeOrder,
	setSelectedCategory,
	setSelectedStartDate,
	setSelectedDueDate,
	setSelectedPriority
} = teamworksSlice.actions;

export default teamworksSlice.reducer;
