import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LeftSidebarHeader from './LeftSidebarHeader';
import reducer from './store';
import { getUserData } from './store/currentUserSlice';
import { getUsers } from './store/usersSlice';
import UserDialog from './UserDialog';
import UserList from './UserList';
import UsersPageHeader from './UsersPageHeader';
import UsersPageSidebar from './UsersPageSidebar';

const useStyles = makeStyles(theme => ({
	contentWrapper: {
		padding: 0,
		[theme.breakpoints.up('sm')]: {
			padding: 24
		}
	},
	contentCard: {
		borderRadius: 20,
		[theme.breakpoints.down('xs')]: {
			borderRadius: '20px 20px 0 0'
		}
	},
	content: {
		borderRadius: 20,
		[theme.breakpoints.down('xs')]: {
			borderRadius: '20px 20px 0 0'
		}
	},
	leftSidebar: {
		width: 256,
		border: 0,
		marginRight: 20
	},
	header: {
		height: 72,
		minHeight: 72,
		[theme.breakpoints.up('sm')]: {
			height: 90,
			minHeight: 90
		}
	},
	sidebarHeader: {
		height: 182,
		minHeight: 182,
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	topBg: {
		height: '180px'
	}
}));

function UsersPage(props) {
	const dispatch = useDispatch();

	const classes = useStyles();
	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getUsers(routeParams));
		dispatch(getUserData());
	}, [dispatch, routeParams]);

	return (
		<>
			<FusePageCarded
				classes={classes}
				header={<UsersPageHeader pageLayout={pageLayout} />}
				content={<UserList container={pageLayout} />}
				leftSidebarHeader={<LeftSidebarHeader />}
				leftSidebarContent={<UsersPageSidebar />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<UserDialog />
		</>
	);
}

export default withReducer('usersPage', reducer)(UsersPage);
