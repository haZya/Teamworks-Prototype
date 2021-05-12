import FusePageSimple from '@fuse/core/FusePageSimple';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import reducer from './store';
// import { getContacts } from './store/contactsSlice';
// import { getUserData } from './store/userSlice';
// import ContactDialog from './ContactDialog';
import UserList from './UserList';
import UsersPageHeader from './UsersPageHeader';
import UsersPageSidebar from './UsersPageSidebar';

function ContactsApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	// useDeepCompareEffect(() => {
	// 	dispatch(getContacts(routeParams));
	// 	dispatch(getUserData());
	// }, [dispatch, routeParams]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<UsersPageHeader pageLayout={pageLayout} />}
				content={<UserList />}
				leftSidebarContent={<UsersPageSidebar />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{/* <ContactDialog /> */}
		</>
	);
}

export default ContactsApp;
