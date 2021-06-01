import mock from '@fake-db/mock';
import _ from '@lodash';
import { addDays } from 'date-fns';
import IProject from 'models/Project';

interface IProjectDB {
	projects: IProject[];
}

const projectsDB: IProjectDB = {
	projects: [
		{
			id: 1,
			data: [
				{
					id: 1,
					start: new Date(),
					end: addDays(new Date(), 11),
					name: 'Demo Task 1'
				},
				{
					id: 2,
					start: addDays(new Date(), 9),
					end: addDays(new Date(), 18),
					name: 'Demo Task 2',
					color: 'orange'
				}
			],
			links: [{ id: 1, start: 1, end: 2 }]
		}
	]
};

mock.onGet('/api/projects/project').reply(request => {
	const { projectId } = request.params;
	const response = _.find(projectsDB.projects, { id: projectId });
	return [200, response];
});

mock.onPost('/api/projects/add/task').reply(request => {
	const { id, index, task } = JSON.parse(request.data);
	const project = _.find(projectsDB.projects, { id });
	project?.data.splice(index, 0, task);
	return [200, { project }];
});

mock.onPost('/api/projects/add/link').reply(request => {
	const { id, link } = JSON.parse(request.data);
	const project = _.find(projectsDB.projects, { id });
	project?.links.push(link);
	return [200, { project }];
});

mock.onPost('/api/projects/update/data').reply(request => {
	const { id, task } = JSON.parse(request.data);
	const project = _.find(projectsDB.projects, { id });
	const data = _.find(project?.data, { id: task.id });
	_.assign(data, task);
	return [200, { project }];
});

mock.onPost('/api/projects/update').reply(request => {
	const data = JSON.parse(request.data);
	projectsDB.projects = projectsDB.projects.map(_project => {
		if (_project.id === data.id) {
			return _.merge(_project, data);
		}
		return _project;
	});

	return [200, data];
});

mock.onPost('/api/projects/tasks/remove').reply(request => {
	const { projectId, taskId } = JSON.parse(request.data);
	const project = _.find(projectsDB.projects, { id: projectId });

	if (project) {
		_.remove(project.data, {
			id: taskId
		});
	}

	return [200, project?.id];
});

mock.onPost('/api/projects/links/remove').reply(request => {
	const { projectId, linkIds } = JSON.parse(request.data);
	const project = _.find(projectsDB.projects, { id: projectId });

	if (project) {
		_.remove(project.links, l => linkIds.includes(l.id));
	}

	return [200, project?.id];
});
