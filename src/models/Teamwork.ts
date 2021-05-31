import FuseUtils from '@fuse/utils';

export interface ICategory {
	id: number;
	value: string;
	label: string;
	color: string;
	icon?: string;
}

export interface IPriority {
	id: number;
	value: string;
	label: string;
	color: string;
}

export interface IStatus {
	id: number;
	value: string;
	label: string;
	color: string;
	icon?: string;
}

interface ITeamwork {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	priority: string;
	startDate: Date | undefined;
	dueDate: Date | undefined;
	team: string[];
}

export default ITeamwork;

export function getNewTeamwork() {
	const newTeamwork: ITeamwork = {
		id: FuseUtils.generateGUID(),
		title: 'Untitled Teamwork',
		slug: 'untitled-teamwork',
		description: 'No description',
		category: 'none',
		priority: '0_none',
		startDate: undefined,
		dueDate: undefined,
		team: []
	};

	return newTeamwork;
}
