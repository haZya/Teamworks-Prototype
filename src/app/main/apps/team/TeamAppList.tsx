import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import ITeamList from 'models/Team';
import IUser from 'models/User';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TeamAppListHeader from './TeamAppListHeader';
import TeamAppListItem from './TeamAppListItem';

const container = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1
		}
	}
};

const useStyles = makeStyles(theme => ({
	list: {
		// backgroundColor: darken(theme.palette.background.paper, theme.palette.type === 'light' ? 0.02 : 0.25),
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short.toString(),
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

interface IProps {
	list: ITeamList;
	index: number;
	width: string | number;
	height: string | number;
	listItems: IUser[];
}

const TeamAppList = ({ list, index, width, height, listItems }: IProps) => {
	const classes = useStyles();

	return (
		<Draggable draggableId={list.id} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Card
						className={clsx(
							classes.list,
							snapshot.isDragging ? 'shadow-lg' : 'shadow',
							'mx-0 md:mx-12 flex flex-col rounded-20'
						)}
						square
						style={{ width, height }}
					>
						<TeamAppListHeader list={list} handleProps={provided.dragHandleProps} />
						<Divider />

						<CardContent className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto">
							<Droppable droppableId={list.id} type="card" direction="vertical">
								{_provided => (
									<motion.div
										initial="hidden"
										animate="show"
										variants={container}
										ref={_provided.innerRef}
										className="flex flex-col w-full h-full px-16 pt-12"
									>
										{listItems.map((listItem, i) => (
											<TeamAppListItem key={listItem.id} index={i} user={listItem} />
										))}
										{_provided.placeholder}
									</motion.div>
								)}
							</Droppable>
						</CardContent>
					</Card>
				</div>
			)}
		</Draggable>
	);
};

export default TeamAppList;
