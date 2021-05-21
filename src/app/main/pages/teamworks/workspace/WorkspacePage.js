import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import CalendarApp from 'app/main/apps/calendar/CalendarApp';
import ChatApp from 'app/main/apps/chat/ChatApp';
import FileManagerApp from 'app/main/apps/file-manager/FileManagerApp';
import MailApp from 'app/main/apps/mail/MailApp';
import NotesApp from 'app/main/apps/notes/NotesApp';
import Boards from 'app/main/apps/scrumboard/boards/Boards';
import TodoApp from 'app/main/apps/todo/TodoApp';
import withReducer from 'app/store/withReducer';
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
		borderRadius: 20,
		[theme.breakpoints.down('xs')]: {
			borderRadius: '20px 20px 0 0'
		},
		[theme.breakpoints.up('lg')]: {
			marginLeft: 12
		}
	},
	content: {
		zIndex: 5,
		borderRadius: 20,
		[theme.breakpoints.down('xs')]: {
			borderRadius: '20px 20px 0 0'
		}
	},
	topBg: {
		height: 180
	}
}));

function WorkspacePage(props) {
	const dispatch = useDispatch();
	const course = useSelector(({ teamworksPage }) => teamworksPage.teamwork);
	const currentTab = useSelector(({ teamworksPage }) => teamworksPage.teamwork.currentTab);

	const classes = useStyles();
	const routeParams = useParams();
	const pageLayout = useRef(null);

	useDeepCompareEffect(() => {
		/**
		 * Get the Teamwork Data
		 */
		dispatch(getTeamwork(routeParams));
	}, [dispatch, routeParams]);

	return (
		<FusePageCarded
			classes={{
				contentWrapper: 'p-0 pt-12 sm:p-12 sm:pb-24',
				contentCard: classes.contentCard,
				content: 'flex flex-col flex-auto overflow-hidden rounded-b-20',
				header: classes.header,
				sidebar: 'border-0',
				topBg: classes.topBg
			}}
			header={<WorkspacePageHeader />}
			content={
				<>
					{currentTab === 0 && <h1>Home</h1>}
					{currentTab === 1 && <h1>Team</h1>}
					{currentTab === 2 && <MailApp />}
					{currentTab === 3 && <ChatApp />}
					{currentTab === 4 && <CalendarApp />}
					{currentTab === 5 && <FileManagerApp />}
					{currentTab === 6 && <Boards />}
					{currentTab === 7 && <h1>Project</h1>}
					{currentTab === 8 && <TodoApp />}
					{currentTab === 9 && <NotesApp />}
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
