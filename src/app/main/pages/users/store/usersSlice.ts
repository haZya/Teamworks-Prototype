import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IUser from 'models/User';
import { RootStateOrAny } from 'react-redux';
import { getUserData } from './currentUserSlice';

export const getUsers = createAsyncThunk<{ data: IUser[]; routeParams: object }, object, { state: RootStateOrAny }>(
	'usersPage/users/getUsers',
	async (routeParams, { getState }) => {
		routeParams = routeParams || getState().usersPage.users.routeParams;
		const response = await axios.get('/api/users', {
			params: routeParams
		});
		const data: IUser[] = await response.data;

		return { data, routeParams };
	}
);

export const addUser = createAsyncThunk<IUser, IUser>('usersPage/users/addUser', async (user, { dispatch }) => {
	const response = await axios.post('/api/add-user', { user });
	const data: IUser = await response.data;

	dispatch(getUsers({}));

	return data;
});

export const updateUser = createAsyncThunk<IUser, IUser>('usersPage/users/updateUser', async (user, { dispatch }) => {
	const response = await axios.post('/api/update-user', { user });
	const data: IUser = await response.data;

	dispatch(getUsers({}));

	return data;
});

export const removeUser = createAsyncThunk<string | number, string | number>(
	'usersPage/users/removeUser',
	async userId => {
		await axios.post('/api/remove-user', { userId });

		return userId;
	}
);

export const removeUsers = createAsyncThunk<string[] | number[], string[] | number[]>(
	'usersPage/users/removeusers',
	async userIds => {
		await axios.post('/api/remove-users', { userIds });

		return userIds;
	}
);

export const toggleStarredUser = createAsyncThunk<IUser, string[] | number[]>(
	'usersPage/users/toggleStarredUser',
	async (userId, { dispatch }) => {
		const response = await axios.post('/api/toggle-starred-user', { userId });
		const data: IUser = await response.data;

		dispatch(getUserData());

		dispatch(getUsers({}));

		return data;
	}
);

export const toggleStarredUsers = createAsyncThunk<IUser[], string[] | number[]>(
	'usersPage/users/toggleStarredUser',
	async (userIds, { dispatch }) => {
		const response = await axios.post('/api/toggle-starred-users', { userIds });
		const data: IUser[] = await response.data;

		dispatch(getUserData());

		dispatch(getUsers({}));

		return data;
	}
);

export const setUsersStarred = createAsyncThunk<IUser, string[] | number[]>(
	'usersPage/users/setUsersStarred',
	async (userIds, { dispatch }) => {
		const response = await axios.post('/api/set-users-starred', { userIds });
		const data: IUser = await response.data;

		dispatch(getUserData());

		dispatch(getUsers({}));

		return data;
	}
);

export const setUsersUnstarred = createAsyncThunk<IUser[], string[] | number[]>(
	'usersPage/users/setUsersUnstarred',
	async (userIds, { dispatch }) => {
		const response = await axios.post('/api/set-users-unstarred', { userIds });
		const data: IUser[] = await response.data;

		dispatch(getUserData());

		dispatch(getUsers({}));

		return data;
	}
);

const usersAdapter: EntityAdapter<IUser> = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
	(state: RootStateOrAny) => state.usersPage.users
);

export interface IUserDialog {
	type: string;
	props: {
		open: boolean;
	};
	data: IUser | object;
}

export interface IInitialState {
	searchText: string;
	routeParams: object;
	userDialog: IUserDialog;
}

const initialtState: IInitialState = {
	searchText: '',
	routeParams: {},
	userDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: {}
	}
};

const usersSlice = createSlice({
	name: 'usersPage/users',
	initialState: usersAdapter.getInitialState(initialtState),
	reducers: {
		setUsersSearchText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;
		},
		openNewUserDialog: state => {
			state.userDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: {}
			};
		},
		closeNewUserDialog: state => {
			state.userDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: {}
			};
		},
		openEditUserDialog: (state, action: PayloadAction<IUser>) => {
			state.userDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditUserDialog: state => {
			state.userDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: {}
			};
		}
	},
	extraReducers: {
		[updateUser.fulfilled.type]: usersAdapter.upsertOne,
		[addUser.fulfilled.type]: usersAdapter.addOne,
		[removeUsers.fulfilled.type]: (state, action) => usersAdapter.removeMany(state, action.payload),
		[removeUser.fulfilled.type]: (state, action) => usersAdapter.removeOne(state, action.payload),
		[getUsers.fulfilled.type]: (state, action) => {
			const { data, routeParams } = action.payload;
			usersAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const { setUsersSearchText, openNewUserDialog, closeNewUserDialog, openEditUserDialog, closeEditUserDialog } =
	usersSlice.actions;

export default usersSlice.reducer;
