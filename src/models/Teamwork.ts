export interface ICategory {
	id: number;
	value: string;
	label: string;
	color: string;
}

export interface IPriority {
	id: number;
	value: string;
	label: string;
}

interface ITeamwork {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	priority: string;
	startDate: Date;
	dueDate: Date;
	team: string[];
}

export default ITeamwork;
