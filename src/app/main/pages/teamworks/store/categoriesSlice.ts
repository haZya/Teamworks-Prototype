import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICategory } from 'models/Teamwork';
import { RootStateOrAny } from 'react-redux';

export const getCategories = createAsyncThunk<ICategory[]>('teamworksPage/categories/getCategories', async () => {
	const response = await axios.get('/api/teamworks/categories');
	const data: ICategory[] = await response.data;

	return data;
});

const categoriesAdapter: EntityAdapter<ICategory> = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } = categoriesAdapter.getSelectors(
	(state: RootStateOrAny) => state.teamworksPage.categories
);

const categorySlice = createSlice({
	name: 'teamworksPage/categories',
	initialState: categoriesAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getCategories.fulfilled.type]: categoriesAdapter.setAll
	}
});

export default categorySlice.reducer;
