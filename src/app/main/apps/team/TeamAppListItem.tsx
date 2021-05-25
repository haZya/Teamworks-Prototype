import { Avatar, Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import IUser from 'models/User';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short.toString(),
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	name: {
		fontSize: 14
	},
	jobTitle: {
		color: theme.palette.primary.light
	}
}));

interface IProps {
	index: number;
	user: IUser;
}

function TeamAppListItem({ index, user }: IProps) {
	const classes = useStyles();

	return (
		<Draggable draggableId={user.id} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Card
						className={clsx(
							classes.card,
							snapshot.isDragging ? 'shadow-lg' : 'shadow-0',
							'w-full mb-12 rounded-16 cursor-pointer border-1'
						)}
					>
						<div className="flex items-center p-8 w-full">
							<Tooltip title={user.name}>
								<Avatar className="ml-4 mr-12 w-40 h-40" alt={user.name} src={user.avatar} />
							</Tooltip>
							<div>
								<Typography className={clsx(classes.name, 'font-medium text-md')}>
									{user.name} {user.lastName}
								</Typography>
								<Typography className={clsx(classes.jobTitle, 'font-medium text-xs truncate')}>
									{user.jobTitle}
								</Typography>
							</div>
						</div>
					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default TeamAppListItem;
