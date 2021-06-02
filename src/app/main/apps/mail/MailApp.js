import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MailDetails from './mail/MailDetails';
import MailToolbar from './mail/MailToolbar';
import MailAppHeader from './MailAppHeader';
import MailAppSidebarContent from './MailAppSidebarContent';
import MailAppSidebarHeader from './MailAppSidebarHeader';
import MailList from './mails/MailList';
import MailsToolbar from './mails/MailsToolbar';
import reducer from './store';
import { getFilters } from './store/filtersSlice';
import { getFolders } from './store/foldersSlice';
import { getLabels } from './store/labelsSlice';

const pathToRegexp = require('path-to-regexp');

function MailApp(props) {
	const dispatch = useDispatch();

	const toPath = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/:tab/:folderHandle?');

	const pageLayout = useRef(null);
	const routeParams = useParams();
	const history = useHistory();

	useEffect(() => {
		if (!routeParams.folderHandle && !routeParams.filterHandle && !routeParams.labelHandle) {
			history.replace(toPath({ ...routeParams, folderHandle: 'inbox' }));
		}
	}, [history, routeParams, toPath]);

	useEffect(() => {
		dispatch(getFilters());
		dispatch(getFolders());
		dispatch(getLabels());
	}, [dispatch]);

	return (
		<FusePageCarded
			classes={{
				root: 'w-full',
				content: 'flex flex-col',
				header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<MailAppHeader pageLayout={pageLayout} />}
			contentToolbar={routeParams.id ? <MailToolbar /> : <MailsToolbar />}
			content={routeParams.id ? <MailDetails /> : <MailList />}
			leftSidebarHeader={<MailAppSidebarHeader />}
			leftSidebarContent={<MailAppSidebarContent />}
			innerScroll
			ref={pageLayout}
		/>
	);
}

export default withReducer('mailApp', reducer)(MailApp);
