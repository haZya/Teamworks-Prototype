import FusePageSimple from '@fuse/core/FusePageSimple';
import { Fab, Hidden, Icon, makeStyles, Tooltip, Zoom } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { getNewTeamwork } from 'models/Teamwork';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import reducer from './store';
import { addTeamwork } from './store/teamworkSlice';
import TeamworkList from './TeamworkList';
import TeamworksPageToolbar from './TeamworksPageContentToolbar';
import TeamworksPageHeader from './TeamworksPageHeader';
import TeamworksPageSidebar from './TeamworksPageSidebar';

const useStyles = makeStyles(theme => ({
	header: {
		height: 72,
		minHeight: 72,
		[theme.breakpoints.up('sm')]: {
			height: 180,
			minHeight: 180
		}
	}
}));

function TeamworksPage() {
	const dispatch = useDispatch();

	const classes = useStyles();
	const pageLayout = useRef(null);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'px-12 pt-24',
					leftSidebar: 'w-256 border-0',
					toolbar: 'px-16 pt-128 pb-136 sm:py-64 md:py-0',
					header: classes.header,
					wrapper: 'min-h-0'
				}}
				header={<TeamworksPageHeader pageLayout={pageLayout} />}
				contentToolbar={<TeamworksPageToolbar />}
				content={<TeamworkList />}
				leftSidebarContent={<TeamworksPageSidebar />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>

			<Hidden lgUp>
				<Zoom in unmountOnExit>
					<Tooltip title="Add Teamwork">
						<Fab
							className="z-99 absolute bottom-16 right-16"
							color="secondary"
							aria-label="add"
							onClick={() => dispatch(addTeamwork(getNewTeamwork()))}
						>
							<Icon>add</Icon>
						</Fab>
					</Tooltip>
				</Zoom>
			</Hidden>
		</>
	);
}

export default withReducer('teamworksPage', reducer)(TeamworksPage);
