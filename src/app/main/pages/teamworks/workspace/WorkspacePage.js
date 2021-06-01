import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import CalendarApp from 'app/main/apps/calendar/CalendarApp';
import ChatApp from 'app/main/apps/chat/ChatApp';
import FileManagerApp from 'app/main/apps/file-manager/FileManagerApp';
import MailApp from 'app/main/apps/mail/MailApp';
import NotesApp from 'app/main/apps/notes/NotesApp';
import ProjectApp from 'app/main/apps/project/ProjectApp';
import Board from 'app/main/apps/scrumboard/board/Board';
import Boards from 'app/main/apps/scrumboard/boards/Boards';
import TeamApp from 'app/main/apps/team/TeamApp';
import TodoApp from 'app/main/apps/todo/TodoApp';
import HomeApp from 'app/main/apps/workspace-home/HomeApp';
import { showMessage } from 'app/store/fuse/messageSlice';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import reducer from '../store';
import { getTeamwork } from '../store/teamworkSlice';
import WorkspacePageContentToolbar from './WorkspacePageContentToolbar';
import WorkspacePageHeader from './WorkspacePageHeader';
import WorkspacePageRightSidebar from './WorkspacePageRightSidebar';

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles(theme => ({
	header: {
		height: 60,
		minHeight: 60,
		[theme.breakpoints.up('sm')]: {
			height: 103,
			minHeight: 103
		}
	},
	contentCard: {
		borderBottom: 0,
		border: theme.palette.type === 'dark' && `2px solid ${theme.palette.primary.main}`
	},
	sidebarHeader: {
		height: 180,
		minHeight: 180
	},
	topBg: {
		height: 180
	}
}));

function WorkspacePage(props) {
	const dispatch = useDispatch();

	const toPath = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/:tab/:folderHandle?');

	const classes = useStyles();
	const routeParams = useParams();
	const history = useHistory();
	const pageLayout = useRef(null);
	const { tab, boardId } = routeParams;

	useEffect(() => {
		if (!routeParams.tab && !routeParams.boardId) {
			history.push(toPath({ ...routeParams, tab: 'home' }));
		}
	}, [history, routeParams, toPath]);

	let promise;

	useDeepCompareEffect(async () => {
		/**
		 * Get the Teamwork Data
		 */
		promise = dispatch(getTeamwork({ teamworksId: routeParams.teamworkId }));
	}, [dispatch, routeParams]);

	useDeepCompareEffect(async () => {
		const { payload } = await promise;

		if (_.isEmpty(payload)) {
			dispatch(
				showMessage({
					message: 'Requested teamwork do not exist.',
					autoHideDuration: 2000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					}
				})
			);
			history.push('/teamworks');
		}
	}, [promise, history]);

	return (
		<FusePageCarded
			classes={{
				contentWrapper: 'p-0 pt-12 sm:px-12',
				contentCard: clsx(classes.contentCard, 'lg:ml-12'),
				content: 'flex flex-col flex-auto overflow-hidden',
				header: classes.header,
				sidebar: 'border-0',
				rightSidebar: 'w-320',
				sidebarHeader: classes.sidebarHeader,
				topBg: classes.topBg
			}}
			header={<WorkspacePageHeader />}
			content={
				<>
					{tab === 'home' && <HomeApp />}
					{tab === 'team' && <TeamApp />}
					{tab === 'email' && <MailApp />}
					{tab === 'chat' && <ChatApp />}
					{tab === 'calendar' && <CalendarApp />}
					{tab === 'files' && <FileManagerApp />}
					{tab === 'tasks' && <Boards />}
					{boardId && <Board />}
					{tab === 'project' && <ProjectApp />}
					{tab === 'to-do' && <TodoApp />}
					{tab === 'notes' && <NotesApp />}
				</>
			}
			contentToolbar={<WorkspacePageContentToolbar />}
			rightSidebarHeader={<></>}
			rightSidebarContent={<WorkspacePageRightSidebar />}
			innerScroll
			ref={pageLayout}
		/>
	);
}

export default withReducer('teamworksPage', reducer)(WorkspacePage);
