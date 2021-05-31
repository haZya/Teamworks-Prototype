import _ from '@lodash';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import ITeamList from 'models/Team';
import { DropResult } from 'react-beautiful-dnd';
import { RootStateOrAny } from 'react-redux';
import reorder from './reorder';

export const getLists = createAsyncThunk<ITeamList[]>('teamApp/getLists', async () => {
	const response = await axios.get('/api/team-app/lists');
	const data: ITeamList[] = await response.data;
	return data;
});

export const reorderList = createAsyncThunk<ITeamList[], DropResult, { state: RootStateOrAny }>(
	'teamApp/reorderLists',
	async ({ source, destination }, { dispatch, getState }) => {
		const { lists }: { lists: ITeamList[] } = getState().teamApp.team;

		const ordered = reorder(_.merge([], lists), source.index, destination?.index || 0);

		const response = await axios.post('/api/team-app/lists/order', {
			lists: ordered
		});

		const data: ITeamList[] = await response.data;

		dispatch(
			showMessage({
				message: 'List Order Saved',
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				}
			})
		);

		return data;
	}
);

export const reorderTeam = createAsyncThunk<string[], string[], { state: RootStateOrAny }>(
	'teamApp/item/reorderTeam',
	async (ordered, { dispatch, getState }) => {
		const teamworkId = getState().teamworksPage.teamwork.id;

		const response = await axios.post('/api/teamworks/team/order', {
			teamworkId,
			team: ordered
		});

		const data: string[] = await response.data;

		dispatch(
			showMessage({
				message: 'List Updated',
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				}
			})
		);

		return data;
	}
);

export const renameList = createAsyncThunk<
	{ listId: string; listTitle: string },
	{ listId: string; listTitle: string }
>('teamApp/renameList', async ({ listId, listTitle }, { dispatch, getState }) => {
	const response = await axios.post('/api/team-app/list/rename', {
		listId,
		listTitle
	});

	const data = await response.data;

	return data;
});

interface IInitialState {
	lists: ITeamList[];
	team: string[];
}

const initialtState: IInitialState = {
	lists: [],
	team: []
};

const teamSlice = createSlice({
	name: 'teamApp/team',
	initialState: initialtState,
	reducers: {
		resetLists: state => {
			state.lists = [];
			state.team = [];
		}
	},
	extraReducers: {
		[getLists.fulfilled.type]: (state, action: PayloadAction<ITeamList[]>) => action.payload,
		[reorderList.fulfilled.type]: (state, action: PayloadAction<ITeamList[]>) => {
			state.lists = action.payload;
		},
		[reorderTeam.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
			state.team = action.payload;
		},
		[renameList.fulfilled.type]: (state, action: PayloadAction<{ listId: string; listTitle: string }>) => {
			const { listId, listTitle } = action.payload;
			state.lists = state.lists.map(list => {
				if (list.id === listId) {
					list.name = listTitle;
				}
				return list;
			});
		}
	}
});

export const { resetLists } = teamSlice.actions;

export default teamSlice.reducer;
