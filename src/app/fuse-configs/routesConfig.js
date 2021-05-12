import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import pagesConfigs from 'app/main/pages/pagesConfig';
import { Redirect } from 'react-router-dom';

const routeConfigs = [...pagesConfigs, ExampleConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/dashboard" />
	}
];

export default routes;
