import { lazy } from 'react';

const TeamworksPageConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/teamworks/:teamworkId/:teamworkHandle/:boardId/:boardUri?',
			component: lazy(() => import('../../apps/scrumboard/board/Board'))
		},
		{
			path: '/teamworks/:teamworkId/:teamworkHandle?',
			component: lazy(() => import('./workspace/WorkspacePage'))
		},
		{
			path: '/teamworks',
			component: lazy(() => import('./TeamworksPage'))
		}
	]
};

export default TeamworksPageConfig;
