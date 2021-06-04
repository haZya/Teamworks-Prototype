import _ from '@lodash';
import { amber, blue, blueGrey, green, purple, red } from '@material-ui/core/colors';
import ITeamwork, { ICategory, IPriority, IStatus } from 'models/Teamwork';
import mock from '../mock';

interface ITamworksDB {
	categories: ICategory[];
	priorities: IPriority[];
	statuses: IStatus[];
	teamworks: ITeamwork[];
}

const teamworksDB: ITamworksDB = {
	categories: [
		{
			id: 0,
			value: 'none',
			label: 'None',
			color: blueGrey[500],
			icon: 'error_outline'
		},
		{
			id: 1,
			value: 'infrastructure',
			label: 'Infrastructure',
			color: blue[500],
			icon: 'settings_input_component'
		},
		{
			id: 2,
			value: 'services',
			label: 'Services',
			color: amber[500],
			icon: 'settings_input_antenna'
		},
		{
			id: 3,
			value: 'internal',
			label: 'Internal',
			color: purple[500],
			icon: 'border_inner'
		},
		{
			id: 4,
			value: 'external',
			label: 'External',
			color: green[500],
			icon: 'border_outer'
		},
		{
			id: 5,
			value: 'staff',
			label: 'Staff',
			color: green[500],
			icon: 'people_alt'
		}
	],
	priorities: [
		{
			id: 0,
			value: '0_none',
			label: 'None',
			color: blueGrey[500]
		},
		{
			id: 1,
			value: '1_high',
			label: 'High',
			color: red[500]
		},
		{
			id: 2,
			value: '2_medium',
			label: 'Medium',
			color: amber[500]
		},
		{
			id: 3,
			value: '3_low',
			label: 'Low',
			color: green[500]
		}
	],
	statuses: [
		{
			id: 0,
			value: 'not-started',
			label: 'Not Started',
			color: green[500],
			icon: 'pause'
		},
		{
			id: 1,
			value: 'in-progress',
			label: 'In Progress',
			color: blue[500],
			icon: 'autorenew'
		},
		{
			id: 2,
			value: 'completed',
			label: 'Completed',
			color: red[500],
			icon: 'done'
		}
	],
	teamworks: [
		{
			id: '15459251a6d6b397565',
			title: 'Cabling Project Site A to B',
			slug: 'cabling-project-site-a-to-b',
			description:
				'Site A connected via microwave link and need high speed networking as number of end points increased.',
			category: 'infrastructure',
			priority: '2_medium',
			startDate: new Date('May 18, 2021'),
			dueDate: new Date('Jun 28, 2021'),
			team: [
				'5725a680cd7efa56a45aea5d',
				'5725a68018c663044be49cbf',
				'5725a6809413bf8a0a5272b1',
				'5725a6803d87f1b77e17b62b',
				'5725a680653c265f5c79b5a9'
			],
			projectId: 1
		},
		{
			id: '15453ba60d3baa5daaf',
			title: 'Guest lecture Series for GIS initiatives',
			slug: 'guest-lecture-series-for-gis-initiatives',
			description: '10 sessions to be discussed.',
			category: 'external',
			priority: '2_medium',
			startDate: new Date('May 18, 2021'),
			dueDate: new Date('Jun 18, 2021'),
			team: ['5725a6801146cce777df2a08', '5725a680653c265f5c79b5a9'],
			projectId: 1
		},
		{
			id: '154588a0864d2881124',
			title: 'Network Planning for new site Delta',
			slug: 'network-planning-for-new-site-delta',
			description: 'Delta site has over 50 end points and expected to increase to 100.',
			category: 'infrastructure',
			priority: '3_low',
			startDate: new Date('Sep 01, 2021'),
			dueDate: new Date('Nov 18, 2021'),
			team: ['5725a680e7eb988a58ddf303', '5725a6806acf030f9341e925', '5725a68034cb3968e1f79eac'],
			projectId: 1
		},
		{
			id: '15453a06c08fb021776',
			title: 'Staff relocation 2022',
			slug: 'staff-relocation-2022',
			description: 'For site Delta and retain full capacity site Alpha.',
			category: 'staff',
			priority: '1_high',
			startDate: new Date('Apr 18, 2021'),
			dueDate: new Date('Jun 8, 2021'),
			team: [
				'5725a6801146cce777df2a08',
				'5725a680bbcec3cc32a8488a',
				'5725a680bc670af746c435e2',
				'5725a68009e20d0a9e9acf2a'
			],
			projectId: 1
		},
		{
			id: '15427f4c1b7f3953234',
			title: 'Software/Hardware Acquisition for 2022',
			slug: 'software-hardware-acquisition-for-2022',
			description: 'Additional budget available, collect requirements and submit proposals.',
			category: 'internal',
			priority: '1_high',
			startDate: new Date('May 7, 2021'),
			dueDate: new Date('Jul 10, 2021'),
			team: [
				'5725a680ae1ae9a3c960d487',
				'5725a6801146cce777df2a08',
				'5725a68034cb3968e1f79eac',
				'5725a6801146cce777df2a08'
			],
			projectId: 1
		},
		{
			id: '1542d75d929a603125',
			title: 'Capacity and performance review in microwave links',
			slug: 'capacity-and-performance-review-in-microwave-links',
			description: 'Recent issues highlights that service is degraded in microwave links.',
			category: 'infrastructure',
			priority: '3_low',
			startDate: new Date('Jul 14, 2021'),
			dueDate: new Date('Aug 18, 2021'),
			team: ['5725a680653c265f5c79b5a9', '5725a680606588342058356d', '5725a680bbcec3cc32a8488a'],
			projectId: 1
		},
		{
			id: '1543ee3a5b43e0f9f45',
			title: 'SCCM Implementation',
			slug: 'sccm-implementation',
			description: 'SCCM federated implementation according to HQ guidelines.',
			category: 'services',
			priority: '2_medium',
			startDate: new Date('May 14, 2021'),
			dueDate: new Date('May 26, 2021'),
			team: ['5725a680bbcec3cc32a8488a', '5725a680e87cb319bd9bd673', '5725a6802d10e277a0f35775'],
			projectId: 1
		},
		{
			id: '1543cc4515df3146112',
			title: 'SOW SAT receivers for Military',
			slug: 'sow-sat-receivers-for-military',
			description: 'New requirement for military.',
			category: 'services',
			priority: '3_high',
			startDate: new Date('Jul 18, 2021'),
			dueDate: new Date('Nov 30, 2021'),
			team: [],
			projectId: 1
		},
		{
			id: '154398a4770d7aaf9a2',
			title: 'Firewall policies',
			slug: 'firewall-policies',
			description: 'To be reviewed to accommodate user community needs.',
			category: 'internal',
			priority: '3_low',
			startDate: new Date('Apr 4, 2021'),
			dueDate: new Date('Jul 8, 2021'),
			team: ['5725a6801146cce777df2a08', '5725a680e87cb319bd9bd673'],
			projectId: 1
		},
		{
			id: '15438351f87dcd68567',
			title: 'Fiber Optic layout project in Location Alpha',
			slug: 'fiber-optic-layout-project-in-location-alpha',
			description: 'Alpha site has the data center and require fiber optic cabling.',
			category: 'infrastructure',
			priority: '1_high',
			startDate: new Date('Mar 12, 2021'),
			dueDate: new Date('May 20, 2021'),
			team: [
				'5725a680bbcec3cc32a8488a',
				'5725a680653c265f5c79b5a9',
				'5725a6808a178bfd034d6ecf',
				'5725a6801146cce777df2a08'
			],
			projectId: 1
		},
		{
			id: '1544e43dcdae6ebf876',
			title: 'IT Service Delivery improvements',
			slug: 'it-service-delivery-improvements',
			description: 'Review current service delivery practices because of complaints.',
			category: 'services',
			priority: '2_medium',
			startDate: new Date('Apr 18, 2021'),
			dueDate: new Date('May 18, 2021'),
			team: [
				'5725a680bbcec3cc32a8488a',
				'5725a680653c265f5c79b5a9',
				'5725a6808a178bfd034d6ecf',
				'5725a6801146cce777df2a08'
			],
			projectId: 1
		},
		{
			id: '1541ca7af66da284177',
			title: 'Datacenter Redundant Power',
			slug: 'datacenter-redundant-power',
			description: 'Required power specifications to be discussed and procured.',
			category: 'infrastructure',
			priority: '2_medium',
			startDate: new Date('Jun 22, 2021'),
			dueDate: new Date('Jul 14, 2021'),
			team: [
				'5725a680bbcec3cc32a8488a',
				'5725a680653c265f5c79b5a9',
				'5725a6808a178bfd034d6ecf',
				'5725a6801146cce777df2a08'
			],
			projectId: 1
		},
		{
			id: '154297167e781781745',
			title: 'DR and BC plans review 2021',
			slug: 'dr-and-bc-plans-review-2021',
			description: 'DR and BC plans to be created, reviewed and to be submitted for approval.',
			category: 'internal',
			priority: '2_medium',
			startDate: new Date('Aug 1, 2021'),
			dueDate: new Date('Nov 1, 2021'),
			team: [],
			projectId: 1
		},
		{
			id: '154537435d5b32bf11a',
			title: 'Communication/VoIP implementation',
			slug: 'communication-vo-ip-implementation',
			description: 'Site Delta VoIP requirements, equipment/services and implementation costs.',
			category: 'services',
			priority: '3_low',
			startDate: new Date('Jul 24, 2021'),
			dueDate: new Date('Sep 18, 2021'),
			team: [],
			projectId: 1
		},
		{
			id: '154204e45a59b168453',
			title: 'ISP Service Review',
			slug: 'isp-service-review',
			description: 'ISP service agreements to be reviewed.',
			category: 'services',
			priority: '2_medium',
			startDate: new Date('May 31, 2021'),
			dueDate: new Date('Jul 31, 2021'),
			team: [],
			projectId: 1
		},
		{
			id: '1541dd1e05dfc439216',
			title: 'SAT Providers Service Review',
			slug: 'sat-providers-service-review',
			description: 'SAT providers service availability issues needs discussions.',
			category: 'services',
			priority: '1_high',
			startDate: new Date('May 16, 2021'),
			dueDate: new Date('May 30, 2021'),
			team: [],
			projectId: 1
		},
		{
			id: '1532dfc67e704e48515',
			title: 'Incident Management Process Review',
			slug: 'incident-management-process-review',
			description: 'Issues highlighted by experts require discussion.',
			category: 'internal',
			priority: '1_high',
			startDate: new Date('Jun 13, 2021'),
			dueDate: new Date('Aug 28, 2021'),
			team: [],
			projectId: 1
		},
		{
			id: '1542e43dfaae6ebf226',
			title: 'Communication/VHF Radio expansion',
			slug: 'communication-vhf-radio-expansion',
			description: 'Site Delta VHF radio/repeaters requirements.',
			category: 'services',
			priority: '3_low',
			startDate: new Date('May 27, 2021'),
			dueDate: new Date('Jun 7, 2021'),
			team: [],
			projectId: 1
		}
	]
};

mock.onGet('/api/teamworks/categories').reply(() => {
	return [200, teamworksDB.categories];
});

mock.onGet('/api/teamworks/priorities').reply(() => {
	return [200, teamworksDB.priorities];
});

mock.onGet('/api/teamworks/statuses').reply(() => {
	return [200, teamworksDB.statuses];
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
	let teamwork = null;

	teamworksDB.teamworks = teamworksDB.teamworks.map(_teamwork => {
		if (_teamwork.id === data.id) {
			teamwork = data;
			return teamwork;
		}
		return _teamwork;
	});

	if (!teamwork) {
		teamwork = data;
		teamworksDB.teamworks.unshift(teamwork);
	}

	return [200, teamwork];
});

mock.onPost('/api/teamworks/update/title').reply(request => {
	const { id, title }: { id: string; title: string } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id });
	_.assign(teamwork, { title, slug: title.toLowerCase().replace(/ /g, '-') });
	return [200, { title }];
});

mock.onPost('/api/teamworks/update/description').reply(request => {
	const { id, description } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id });
	_.assign(teamwork, { description });
	return [200, { description }];
});

mock.onPost('/api/teamworks/update/category').reply(request => {
	const { id, category } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id });
	_.assign(teamwork, { category });
	return [200, { category }];
});

mock.onPost('/api/teamworks/update/priority').reply(request => {
	const { id, priority } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id });
	_.assign(teamwork, { priority });
	return [200, { priority }];
});

mock.onPost('/api/teamworks/update/startDate').reply(request => {
	const { id, startDate } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id });
	_.assign(teamwork, { startDate });
	return [200, { startDate }];
});

mock.onPost('/api/teamworks/update/dueDate').reply(request => {
	const { id, dueDate } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id });
	_.assign(teamwork, { dueDate });
	return [200, { dueDate }];
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

mock.onPost('/api/teamworks/remove').reply(request => {
	const { id } = JSON.parse(request.data);

	_.remove(teamworksDB.teamworks, {
		id
	});

	return [200, id];
});

mock.onPost('/api/teamworks/team/order').reply(request => {
	const { teamworkId, team } = JSON.parse(request.data);
	const teamwork = _.find(teamworksDB.teamworks, { id: teamworkId });
	_.assign(teamwork, { team });
	return [200, team];
});
