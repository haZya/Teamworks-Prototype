import { Divider, Tab, Tabs } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';

const pathToRegexp = require('path-to-regexp');

const WorkspacePageContentToolbar = () => {
	const toPath = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/:tab?');

	const history = useHistory();
	const routeParams = useParams();
	const { tab }: any = routeParams;

	return (
		<Tabs
			value={tab}
			onChange={(_event, value) => history.push(toPath({ ...routeParams, tab: value }))}
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
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Home" value="home" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Team" value="team" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Email" value="email" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Chat" value="chat" />
			<Tab
				className="text-14 font-semibold min-h-40 min-w-64 mx-4"
				disableRipple
				label="Calendar"
				value="calendar"
			/>
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Files" value="files" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Tasks" value="tasks" />
			<Tab
				className="text-14 font-semibold min-h-40 min-w-64 mx-4"
				disableRipple
				label="Project"
				value="project"
			/>
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="To-Do" value="to-do" />
			<Tab className="text-14 font-semibold min-h-40 min-w-64 mx-4" disableRipple label="Notes" value="notes" />
		</Tabs>
	);
};

export default WorkspacePageContentToolbar;
