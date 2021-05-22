import { lazy } from 'react';

const TeamworksPageConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: [
				'/teamworks/:teamworkId/:teamworkHandle/:tab/label/:labelHandle/:mailId?',
				'/teamworks/:teamworkId/:teamworkHandle/:tab/filter/:filterHandle/:mailId?',
				'/teamworks/:teamworkId/:teamworkHandle/:tab/:folderHandle/:mailId?',
				'/teamworks/:teamworkId/:teamworkHandle/:tab?'
			],
			component: lazy(() => import('./workspace/WorkspacePage'))
		},
		{
			path: '/teamworks/:teamworkId/:teamworkHandle/:boardId/:boardUri?',
			component: lazy(() => import('../../apps/scrumboard/board/Board'))
		},
		{
			path: '/teamworks',
			component: lazy(() => import('./TeamworksPage'))
		}
	]
};

export default TeamworksPageConfig;
