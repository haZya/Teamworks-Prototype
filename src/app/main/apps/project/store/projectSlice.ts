import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import IProject from 'models/Project';
import { Link, Task } from 'react-gantt-timeline';
import { RootStateOrAny } from 'react-redux';

export const getProject = createAsyncThunk<IProject, { projectId: string | number }>(
	'projectApp/projects/getProject',
	async params => {
		const response = await axios.get('/api/projects/project', { params });
		const data: IProject = await response.data;
		return data;
	}
);

export const addProjectTask = createAsyncThunk<IProject, { index: number; task: Task }, { state: RootStateOrAny }>(
	'projectApp/projects/addProjectTask ',
	async ({ index, task }, { getState, dispatch }) => {
		const { id }: IProject = getState().projectApp.projects.project;

		const response = await axios.post('/api/projects/add/task', { id, index, task });
		const data: IProject = await response.data;

		dispatch(showMessage({ message: 'Project Updated' }));

		return data;
	}
);

export const addProjectLink = createAsyncThunk<IProject, Link, { state: RootStateOrAny }>(
	'projectApp/projects/addProjectLink ',
	async (link, { getState, dispatch }) => {
		const { id }: IProject = getState().projectApp.projects.project;

		const response = await axios.post('/api/projects/add/link', { id, link });
		const data: IProject = await response.data;

		dispatch(showMessage({ message: 'Project Updated' }));

		return data;
	}
);

export const updateProjectData = createAsyncThunk<IProject, Task, { state: RootStateOrAny }>(
	'projectApp/projects/updateProjectData ',
	async (task, { getState, dispatch }) => {
		const { id }: IProject = getState().projectApp.projects.project;

		const response = await axios.post('/api/projects/update/data', { id, task });
		const data: IProject = await response.data;

		dispatch(showMessage({ message: 'Project Updated' }));

		return data;
	}
);

export const updateProject = createAsyncThunk<IProject, IProject, { state: RootStateOrAny }>(
	'projectApp/projects/updateProject',
	async (_data, { getState, dispatch }) => {
		const { id }: IProject = getState().projectApp.projects.project;

		const response = await axios.post('/api/projects/update', { id, _data });
		const data: IProject = await response.data;

		dispatch(showMessage({ message: 'Project Updated' }));

		return data;
	}
);

export const removeTask = createAsyncThunk<string | number, string | number, { state: RootStateOrAny }>(
	'projectApp/projects/removeTask',
	async (taskId, { getState, dispatch }) => {
		const { id }: IProject = getState().projectApp.projects.project;

		const response = await axios.post('/api/projects/tasks/remove', { projectId: id, taskId });
		const data: string | number = await response.data;

		dispatch(showMessage({ message: 'Task Deleted' }));
		dispatch(getProject({ projectId: data }));

		return data;
	}
);

export const removeLinks = createAsyncThunk<
	string | number,
	{ linkIds: (string | number)[] },
	{ state: RootStateOrAny }
>('projectApp/projects/removeLinks', async ({ linkIds }, { getState, dispatch }) => {
	const { id }: IProject = getState().projectApp.projects.project;

	const response = await axios.post('/api/projects/links/remove', { projectId: id, linkIds });
	const data: string | number = await response.data;

	dispatch(showMessage({ message: 'Links Deleted' }));
	dispatch(getProject({ projectId: data }));

	return data;
});

interface IInitialState {
	project: IProject | null;
	selectedItem: Task | Link | null;
}

const initialState: IInitialState = {
	project: null,
	selectedItem: null
};

const projectSlice = createSlice({
	name: 'projectApp/project',
	initialState,
	reducers: {
		setSelectedItem: (state, action: PayloadAction<Task | Link | null>) => {
			state.selectedItem = action.payload;
		}
	},
	extraReducers: {
		[getProject.fulfilled.type]: (state, action: PayloadAction<IProject>) => {
			state.project = action.payload;
		},
		[addProjectTask.fulfilled.type]: (state, action: PayloadAction<IProject>) => ({
			...state,
			...action.payload
		}),
		[addProjectLink.fulfilled.type]: (state, action: PayloadAction<IProject>) => ({
			...state,
			...action.payload
		}),
		[updateProjectData.fulfilled.type]: (state, action: PayloadAction<IProject>) => ({
			...state,
			...action.payload
		}),
		[updateProject.fulfilled.type]: (state, action: PayloadAction<IProject>) => ({
			...state,
			...action.payload
		})
	}
});

export const { setSelectedItem } = projectSlice.actions;

export default projectSlice.reducer;
