export interface ICategory {
	id: number;
	value: string;
	label: string;
	color: string;
}

interface ITeamwork {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	length: number;
	totalSteps: number;
	activeStep: number;
	updated: string;
	team: string[];
}

export default ITeamwork;
