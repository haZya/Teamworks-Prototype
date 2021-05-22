import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import reducer from './store';
import { getFilters } from './store/filtersSlice';
import { getFolders } from './store/foldersSlice';
import { getLabels } from './store/labelsSlice';
import { getTodos } from './store/todosSlice';
import TodoDialog from './TodoDialog';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoSidebarContent from './TodoSidebarContent';
import TodoSidebarHeader from './TodoSidebarHeader';
import TodoToolbar from './TodoToolbar';

const pathToRegexp = require('path-to-regexp');

function TodoApp(props) {
	const dispatch = useDispatch();

	const toPath = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/:tab/:folderHandle?');

	const pageLayout = useRef(null);
	const routeParams = useParams();
	const history = useHistory();

	useEffect(() => {
		if (!routeParams.folderHandle && !routeParams.filterHandle && !routeParams.labelHandle) {
			history.push(toPath({ ...routeParams, folderHandle: 'all' }));
		}
	}, [history, routeParams, toPath]);

	useEffect(() => {
		dispatch(getFilters());
		dispatch(getFolders());
		dispatch(getLabels());
	}, [dispatch]);

	useDeepCompareEffect(() => {
		dispatch(getTodos(routeParams));
	}, [dispatch, routeParams]);

	return (
		<>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				contentToolbar={<TodoToolbar />}
				content={<TodoList />}
				leftSidebarHeader={<TodoSidebarHeader />}
				leftSidebarContent={<TodoSidebarContent />}
				ref={pageLayout}
				innerScroll
			/>
			<TodoDialog />
		</>
	);
}

export default withReducer('todoApp', reducer)(TodoApp);
