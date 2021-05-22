import { lazy } from 'react';

const TeamworksPageConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/teamworks/:teamworkId/:teamworkHandle/tasks/:boardId/:boardUri?',
			component: lazy(() => import('./workspace/WorkspacePage'))
		},
		{
			path: [
				'/teamworks/:teamworkId/:teamworkHandle/:tab/label/:labelHandle/:id?',
				'/teamworks/:teamworkId/:teamworkHandle/:tab/filter/:filterHandle/:id?',
				'/teamworks/:teamworkId/:teamworkHandle/:tab/:folderHandle/:id?',
				'/teamworks/:teamworkId/:teamworkHandle/:tab?'
			],
			component: lazy(() => import('./workspace/WorkspacePage'))
		},

		{
			path: '/teamworks',
			component: lazy(() => import('./TeamworksPage'))
		}
	]
};

export default TeamworksPageConfig;
