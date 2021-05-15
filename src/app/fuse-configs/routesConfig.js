import FuseUtils from '@fuse/utils';
import pagesConfigs from 'app/main/pages/pagesConfig';
import { Redirect } from 'react-router-dom';

const routeConfigs = [...pagesConfigs];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/dashboard" />
	},
	{
		component: () => <Redirect to="/404" />
	}
];

export default routes;
