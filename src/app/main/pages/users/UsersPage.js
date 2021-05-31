import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { Fab, Hidden, Icon, makeStyles, useMediaQuery, useTheme, Zoom } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LeftSidebarHeader from './LeftSidebarHeader';
import reducer from './store';
import { getUserData } from './store/currentUserSlice';
import { getUsers, openNewUserDialog } from './store/usersSlice';
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
	sidebarWrapper: {
		zIndex: '5!important'
	},
	leftSidebar: {
		width: 276,
		border: 0
	},
	header: {
		height: 72,
		minHeight: 72,
		[theme.breakpoints.up('sm')]: {
			marginTop: -24,
			height: 114,
			minHeight: 114
		}
	},
	sidebarHeader: {
		marginTop: -24,
		height: 204,
		minHeight: 204,
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	topBg: {
		height: 180
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

	const theme = useTheme();
	const xsmDown = useMediaQuery(theme.breakpoints.down(700));
	const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
	const minHeightThreshold = 382;
	let heightOffset = 120;

	heightOffset = xsDown ? 172 : xsmDown ? 154 : 120;
	const [height, setHeight] = useState(undefined);

	useEffect(() => {
		const resizeListener = () => {
			setHeight(pageLayout.current.contentRef.current.clientHeight - heightOffset);
		};

		// Set initial size
		resizeListener();

		// set resize listener
		window.addEventListener('resize', resizeListener);

		// clean up function
		return () => {
			// remove resize listener
			window.removeEventListener('resize', resizeListener);
		};
	}, [pageLayout, heightOffset]);

	return (
		<>
			<FusePageCarded
				classes={classes}
				header={<UsersPageHeader pageLayout={pageLayout} />}
				content={<UserList tableBodyHeight={height} minHeightThreshold={minHeightThreshold} />}
				leftSidebarHeader={<LeftSidebarHeader />}
				leftSidebarContent={<UsersPageSidebar />}
				sidebarInner
				ref={pageLayout}
				innerScroll={height > minHeightThreshold}
			/>
			<UserDialog />
			<Hidden lgUp>
				<Zoom in unmountOnExit>
					<Fab
						className="z-99 absolute bottom-48 right-16"
						color="secondary"
						aria-label="add"
						onClick={() => dispatch(openNewUserDialog())}
					>
						<Icon>add</Icon>
					</Fab>
				</Zoom>
			</Hidden>
		</>
	);
}

export default withReducer('usersPage', reducer)(UsersPage);
