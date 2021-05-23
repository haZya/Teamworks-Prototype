import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import ITeamList from 'models/Team';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TeamAppListHeader from './TeamAppListHeader';

const useStyles = makeStyles(theme => ({
	list: {
		backgroundColor: darken(theme.palette.background.paper, theme.palette.type === 'light' ? 0.02 : 0.25),
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short.toString(),
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

interface IProps {
	list: ITeamList;
	index: number;
	width: number;
}

const TeamAppList = ({ list, index, width }: IProps) => {
	const classes = useStyles();

	return (
		<Draggable draggableId={list.id} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Card
						className={clsx(
							classes.list,
							snapshot.isDragging ? 'shadow-lg' : 'shadow',
							'mx-8 sm:mx-12 my-8 sm:my-12 max-h-full flex flex-col rounded-20'
						)}
						square
						style={{ width }}
					>
						<TeamAppListHeader list={list} handleProps={provided.dragHandleProps} />

						<CardContent className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto">
							<Droppable droppableId={list.id} type="card" direction="vertical">
								{_provided => (
									<div ref={_provided.innerRef} className="flex flex-col w-full h-full p-16">
										{/* {list.idCards.map((cardId, index) => (
												<BoardCard
													key={cardId}
													cardId={cardId}
													index={index}
													list={props.list}
												/>
											))} */}
										{_provided.placeholder}
									</div>
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
