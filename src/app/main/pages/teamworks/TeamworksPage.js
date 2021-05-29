import DemoSidebarContent from '@fuse/core/DemoSidebarContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import reducer from './store';
import TeamworkList from './TeamworkList';
import TeamworksPageToolbar from './TeamworksPageContentToolbar';
import TeamworksPageHeader from './TeamworksPageHeader';

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
	const classes = useStyles();
	const pageLayout = useRef(null);

	return (
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
			leftSidebarContent={
				<div className="p-24">
					<h4>Sidebar Content</h4>
					<br />
					<DemoSidebarContent />
				</div>
			}
			sidebarInner
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('teamworksPage', reducer)(TeamworksPage);
