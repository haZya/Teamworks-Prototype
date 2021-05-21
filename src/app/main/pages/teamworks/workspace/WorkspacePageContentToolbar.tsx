import { Divider, Tab, Tabs } from '@material-ui/core';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setCurrentTab } from '../store/teamworkSlice';

const WorkspacePageContentToolbar = () => {
	const dispatch = useDispatch();
	const currentTab = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork.currentTab);

	return (
		<Tabs
			value={currentTab}
			onChange={(_event, value) => dispatch(setCurrentTab(value))}
			indicatorColor="secondary"
			textColor="inherit"
			variant="scrollable"
			scrollButtons="off"
			className="w-full px-24 -mx-4 min-h-40"
			classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
			TabIndicatorProps={{
				children: <Divider className="w-full h-full rounded-full opacity-50" />
			}}
		>
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Home" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Team" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Email" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Chat" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Calendar" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Files" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Tasks" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Project" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="To-Do" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Notes" />
		</Tabs>
	);
};

export default WorkspacePageContentToolbar;
