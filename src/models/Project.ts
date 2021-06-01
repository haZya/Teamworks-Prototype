import { Link, Task } from 'react-gantt-timeline';

interface IProject {
	id: string | number;
	data: Task[];
	links: Link[];
}

export default IProject;
