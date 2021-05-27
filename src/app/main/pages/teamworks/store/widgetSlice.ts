import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateOrAny } from 'react-redux';

export const getWidgets = createAsyncThunk('teamworksPage/widgets/getWidgets', async () => {
	const response = await axios.get('/api/analytics-dashboard-app/widgets');
	const data = await response.data;

	return data;
});

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgetsEntities, selectById: selectWidgetById } = widgetsAdapter.getSelectors(
	(state: RootStateOrAny) => state.teamworksPage.widgets
);

const widgetsSlice = createSlice({
	name: 'teamworksPage/widgets',
	initialState: widgetsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getWidgets.fulfilled.type]: widgetsAdapter.setAll
	}
});

export default widgetsSlice.reducer;
