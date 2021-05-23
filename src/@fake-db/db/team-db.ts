import _ from '@lodash';
import ITeamList from 'models/Team';
import mock from '../mock';

interface ITeamsDB {
	lists: ITeamList[];
}

const teamsDB: ITeamsDB = {
	lists: [
		{ id: '1', name: 'Available Users' },
		{ id: '2', name: 'Team Members' }
	]
};

mock.onGet('/api/team-app/lists').reply(() => {
	return [200, teamsDB];
});

mock.onPost('/api/team-app/lists/order').reply(request => {
	const { lists }: ITeamsDB = JSON.parse(request.data);
	_.assign(teamsDB, { lists });
	return [200, lists];
});

mock.onPost('/api/team-app/list/rename').reply(request => {
	const { listId, listTitle }: { listId: string; listTitle: string } = JSON.parse(request.data);
	const list = _.find(teamsDB.lists, { id: listId });
	_.assign(list, { name: listTitle });

	return [200, { listTitle, listId }];
});
