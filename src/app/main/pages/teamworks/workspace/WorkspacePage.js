import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import CalendarApp from 'app/main/apps/calendar/CalendarApp';
import ChatApp from 'app/main/apps/chat/ChatApp';
import FileManagerApp from 'app/main/apps/file-manager/FileManagerApp';
import MailApp from 'app/main/apps/mail/MailApp';
import NotesApp from 'app/main/apps/notes/NotesApp';
import Board from 'app/main/apps/scrumboard/board/Board';
import Boards from 'app/main/apps/scrumboard/boards/Boards';
import TodoApp from 'app/main/apps/todo/TodoApp';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from '../store';
import { getTeamwork } from '../store/teamworkSlice';
import WorkspacePageContentToolbar from './WorkspacePageContentToolbar';
import WorkspacePageHeader from './WorkspacePageHeader';
import WorkspacePageRightSidebar from './WorkspacePageRightSidebar';

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
	topBg: {
		height: 180
	}
}));

function WorkspacePage(props) {
	const dispatch = useDispatch();
	const course = useSelector(({ teamworksPage }) => teamworksPage.teamwork);

	const classes = useStyles();
	const routeParams = useParams();
	const pageLayout = useRef(null);
	const { tab } = routeParams;

	useDeepCompareEffect(() => {
		/**
		 * Get the Teamwork Data
		 */
		dispatch(getTeamwork(routeParams));
	}, [dispatch, routeParams]);

	return (
		<FusePageCarded
			classes={{
				contentWrapper: 'p-0 pt-12 sm:px-12',
				contentCard: clsx(classes.contentCard, 'lg:ml-12'),
				content: 'flex flex-col flex-auto overflow-hidden',
				header: classes.header,
				sidebar: 'border-0',
				rightSidebar: 'w-256',
				topBg: classes.topBg
			}}
			header={<WorkspacePageHeader />}
			content={
				<>
					{tab === 'home' && <h1>Home</h1>}
					{tab === 'team' && <h1>Team</h1>}
					{tab === 'email' && <MailApp />}
					{tab === 'chat' && <ChatApp />}
					{tab === 'calendar' && <CalendarApp />}
					{tab === 'files' && <FileManagerApp />}
					{tab === 'tasks' && <Boards />}
					{routeParams.boardId && <Board />}
					{tab === 'project' && <h1>Project</h1>}
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
