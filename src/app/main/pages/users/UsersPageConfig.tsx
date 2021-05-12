import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const UsersPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/users/:id',
			component: lazy(() => import('./UsersPage'))
		},
		{
			path: '/users',
			component: () => <Redirect to="/users/all" />
		}
	]
};

export default UsersPageConfig;
