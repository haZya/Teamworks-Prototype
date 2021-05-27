import _ from '@lodash';
import { amber, blue, blueGrey, green } from '@material-ui/core/colors';
import ITeamwork, { ICategory } from 'models/Teamwork';
import mock from '../mock';

interface ITamworksDB {
	categories: ICategory[];
	teamworks: ITeamwork[];
}

const teamworksDB: ITamworksDB = {
	categories: [
		{
			id: 0,
			value: 'web',
			label: 'Web',
			color: blue[500]
		},
		{
			id: 1,
			value: 'firebase',
			label: 'Firebase',
			color: amber[500]
		},
		{
			id: 2,
			value: 'cloud',
			label: 'Cloud',
			color: blueGrey[500]
		},
		{
			id: 3,
			value: 'android',
			label: 'Android',
			color: green[500]
		}
	],
	teamworks: [
		{
			id: '15459251a6d6b397565',
			title: 'Basics of Angular',
			slug: 'basics-of-angular',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'web',
			length: 30,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: [
				'5725a680cd7efa56a45aea5d',
				'5725a68018c663044be49cbf',
				'5725a6809413bf8a0a5272b1',
				'5725a6803d87f1b77e17b62b'
			]
		},
		{
			id: '154588a0864d2881124',
			title: 'Basics of TypeScript',
			slug: 'basics-of-typeScript',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'web',
			length: 60,
			totalSteps: 11,
			activeStep: 3,
			updated: 'Nov 01, 2017',
			team: ['5725a680e7eb988a58ddf303', '5725a6806acf030f9341e925', '5725a68034cb3968e1f79eac']
		},
		{
			id: '15453ba60d3baa5daaf',
			title: 'Android N: Quick Settings',
			slug: 'android-n-quick-settings',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'android',
			length: 120,
			totalSteps: 11,
			activeStep: 11,
			updated: 'May 18, 2021 ',
			team: ['5725a6801146cce777df2a08', '5725a680653c265f5c79b5a9']
		},
		{
			id: '15453a06c08fb021776',
			title: 'Keep Sensitive Data Safe and Private',
			slug: 'keep-sensitive-data-safe-and-private',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'android',
			length: 45,
			totalSteps: 11,
			activeStep: 2,
			updated: 'May 18, 2021 ',
			team: [
				'5725a6801146cce777df2a08',
				'5725a680bbcec3cc32a8488a',
				'5725a680bc670af746c435e2',
				'5725a68009e20d0a9e9acf2a'
			]
		},
		{
			id: '15427f4c1b7f3953234',
			title: 'Building a gRPC Service with Java',
			slug: 'building-a-grpc-service-with-java',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'cloud',
			length: 30,
			totalSteps: 11,
			activeStep: 11,
			updated: 'May 18, 2021 ',
			team: [
				'5725a680ae1ae9a3c960d487',
				'5725a6801146cce777df2a08',
				'5725a68034cb3968e1f79eac',
				'5725a6801146cce777df2a08'
			]
		},
		{
			id: '1542d75d929a603125',
			title: 'Build a PWA Using Workbox',
			slug: 'build-a-pwa-using-workbox',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'web',
			length: 120,
			totalSteps: 11,
			activeStep: 8,
			updated: 'May 18, 2021 ',
			team: ['5725a680653c265f5c79b5a9', '5725a680606588342058356d', '5725a680bbcec3cc32a8488a']
		},
		{
			id: '1543ee3a5b43e0f9f45',
			title: 'Build an App for the Google Assistant with Firebase and Dialogflow',
			slug: 'build-an-app-for-the-google-assistant-with-firebase-and-dialogflow',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'firebase',
			length: 30,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: ['5725a680bbcec3cc32a8488a', '5725a680e87cb319bd9bd673', '5725a6802d10e277a0f35775']
		},
		{
			id: '1543cc4515df3146112',
			title: 'Cloud Functions for Firebase',
			slug: 'cloud-functions-for-firebase',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'firebase',
			length: 45,
			totalSteps: 11,
			activeStep: 7,
			updated: 'May 18, 2021 ',
			team: []
		},
		{
			id: '154398a4770d7aaf9a2',
			title: "Manage Your Pivotal Cloud Foundry App's Using Apigee Edge",
			slug: 'manage-your-pivotal-cloud-foundry-apps-using-apigee-Edge',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'cloud',
			length: 90,
			totalSteps: 11,
			activeStep: 5,
			updated: 'May 18, 2021 ',
			team: ['5725a6801146cce777df2a08', '5725a680e87cb319bd9bd673']
		},
		{
			id: '15438351f87dcd68567',
			title: 'Building Beautiful UIs with Flutter',
			slug: 'building-beautiful-uis-with-flutter',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'web',
			length: 90,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: [
				'5725a680bbcec3cc32a8488a',
				'5725a680653c265f5c79b5a9',
				'5725a6808a178bfd034d6ecf',
				'5725a6801146cce777df2a08'
			]
		},
		{
			id: '1544e43dcdae6ebf876',
			title: 'Cloud Firestore',
			slug: 'cloud-firestore',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'firebase',
			length: 90,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: [
				'5725a680bbcec3cc32a8488a',
				'5725a680653c265f5c79b5a9',
				'5725a6808a178bfd034d6ecf',
				'5725a6801146cce777df2a08'
			]
		},
		{
			id: '1541ca7af66da284177',
			title: 'Customize Network Topology with Subnetworks',
			slug: 'customize-network-topology-with-subnetworks',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'web',
			length: 45,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: [
				'5725a680bbcec3cc32a8488a',
				'5725a680653c265f5c79b5a9',
				'5725a6808a178bfd034d6ecf',
				'5725a6801146cce777df2a08'
			]
		},
		{
			id: '154297167e781781745',
			title: 'Looking at Campaign Finance with BigQuery',
			slug: 'looking-at-campaign-finance-with-bigquery',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'cloud',
			length: 60,
			totalSteps: 11,
			activeStep: 3,
			updated: 'May 18, 2021 ',
			team: []
		},
		{
			id: '154537435d5b32bf11a',
			title: 'Firebase Android',
			slug: 'firebase-android',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'android',
			length: 45,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: []
		},
		{
			id: '154204e45a59b168453',
			title: 'Simulating a Thread Network Using OpenThread',
			slug: 'simulating-a-thread-network-using-openthread',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'web',
			length: 45,
			totalSteps: 11,
			activeStep: 1,
			updated: 'May 18, 2021 ',
			team: []
		},
		{
			id: '1541dd1e05dfc439216',
			title: 'Your First Progressive Web App',
			slug: 'your-first-progressive-web-app',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'web',
			length: 30,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: []
		},
		{
			id: '1532dfc67e704e48515',
			title: 'Launch Cloud Datalab',
			slug: 'launch-cloud-datalab',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'cloud',
			length: 60,
			totalSteps: 11,
			activeStep: 0,
			updated: 'May 18, 2021 ',
			team: []
		},
		{
			id: '1542e43dfaae6ebf226',
			title: 'Personalize Your iOS App with Firebase User Management',
			slug: 'personalize-your-ios-app-with-firebase-user-management',
			description: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			category: 'firebase',
			length: 90,
			totalSteps: 11,
			activeStep: 11,
			updated: 'May 18, 2021 ',
			team: []
		}
	]
};

mock.onGet('/api/teamworks/categories').reply(() => {
	return [200, teamworksDB.categories];
});

mock.onGet('/api/teamworks').reply(() => {
	return [200, teamworksDB.teamworks];
});

mock.onGet('/api/teamworks/teamwork').reply(request => {
	const { teamworksId } = request.params;
	const response = _.find(teamworksDB.teamworks, { id: teamworksId });
	return [200, response];
});

mock.onPost('/api/teamworks/save').reply(request => {
	const data = JSON.parse(request.data);
	let course = null;

	teamworksDB.teamworks = teamworksDB.teamworks.map(_teamwork => {
		if (_teamwork.id === data.id) {
			course = data;
			return course;
		}
		return _teamwork;
	});

	if (!course) {
		course = data;
		teamworksDB.teamworks = [...teamworksDB.teamworks, course];
	}

	return [200, course];
});

mock.onPost('/api/teamworks/update').reply(request => {
	const data = JSON.parse(request.data);
	teamworksDB.teamworks = teamworksDB.teamworks.map(_teamwork => {
		if (_teamwork.id === data.id) {
			return _.merge(_teamwork, data);
		}
		return _teamwork;
	});

	return [200, data];
});

mock.onPost('/api/teamworks/team/order').reply(request => {
	const { teamworkId, team } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id: teamworkId });
	_.assign(teamwork, { team });
	return [200, team];
});
