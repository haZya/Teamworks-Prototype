import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { getNewTeamwork } from 'models/Teamwork';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { selectCategories } from './store/categoriesSlice';
import { selectPriorities } from './store/prioritiesSlice';
import { selectStatuses } from './store/statusesSlice';
import { addTeamwork } from './store/teamworkSlice';
import { IInitialState, setSelectedCategory, setSelectedPriority, setSelectedStatus } from './store/teamworksSlice';

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: '100%',
		borderRadius: 6,
		paddingLeft: 12,
		paddingRight: 12,
		marginBottom: 4,
		'&.active': {
			backgroundColor:
				theme.palette.type === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		paddingLeft: 12
	}
}));

function TeamworksPageSidebar() {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const priorities = useSelector(selectPriorities);
	const statuses = useSelector(selectStatuses);
	const { selectedCategory, selectedPriority, selectedStatus }: IInitialState = useSelector(
		({ teamworksPage }: RootStateOrAny) => teamworksPage.teamworks
	);

	const classes = useStyles();

	return (
		<motion.div
			initial={{ y: 50, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
			className="flex-auto border-l-1 border-solid"
		>
			<div className="p-24 pb-16">
				<Button
					onClick={() => {
						dispatch(addTeamwork(getNewTeamwork()));
					}}
					variant="contained"
					color="secondary"
					className="w-full"
				>
					Add teamwork
				</Button>
			</div>

			<div className="px-12">
				<List>
					<ListSubheader className={classes.listSubheader} disableSticky>
						STATUS
					</ListSubheader>

					<ListItem
						className={classes.listItem}
						button
						selected={selectedStatus === 'all'}
						onClick={() => dispatch(setSelectedStatus('all'))}
					>
						<Icon className="list-item-icon" color="action">
							view_headline
						</Icon>
						<ListItemText primary="All" disableTypography />
					</ListItem>
					{statuses.length > 0 &&
						statuses.map(status => (
							<ListItem
								key={status.id}
								className={classes.listItem}
								button
								selected={selectedStatus === status.value}
								onClick={() => dispatch(setSelectedStatus(status.value))}
							>
								<Icon className="list-item-icon" style={{ color: status.color }} color="action">
									{status.icon || 'star'}
								</Icon>
								<ListItemText primary={status.label} disableTypography />
							</ListItem>
						))}
				</List>

				<List>
					<ListSubheader className={classes.listSubheader} disableSticky>
						CATEGORIES
					</ListSubheader>

					<ListItem
						className={classes.listItem}
						button
						selected={selectedCategory === 'all'}
						onClick={() => dispatch(setSelectedCategory('all'))}
					>
						<Icon className="list-item-icon" color="action">
							view_headline
						</Icon>
						<ListItemText primary="All" disableTypography />
					</ListItem>
					{categories.length > 0 &&
						categories.map(_cat => (
							<ListItem
								key={_cat.id}
								className={classes.listItem}
								button
								selected={selectedCategory === _cat.value}
								onClick={() => dispatch(setSelectedCategory(_cat.value))}
							>
								<Icon className="list-item-icon" style={{ color: _cat.color }} color="action">
									{_cat.icon || 'category'}
								</Icon>
								<ListItemText primary={_cat.label} disableTypography />
							</ListItem>
						))}
				</List>

				<List>
					<ListSubheader className={classes.listSubheader} disableSticky>
						PRIORITIES
					</ListSubheader>

					<ListItem
						className={classes.listItem}
						button
						selected={selectedPriority === 'all'}
						onClick={() => dispatch(setSelectedPriority('all'))}
					>
						<Icon className="list-item-icon" color="action">
							view_headline
						</Icon>
						<ListItemText primary="All" disableTypography />
					</ListItem>
					{priorities.length > 0 &&
						priorities.map(priority => (
							<ListItem
								key={priority.id}
								className={classes.listItem}
								button
								selected={selectedPriority === priority.value}
								onClick={() => dispatch(setSelectedPriority(priority.value))}
							>
								<Icon className="list-item-icon" style={{ color: priority.color }} color="action">
									label
								</Icon>
								<ListItemText primary={priority.label} disableTypography />
							</ListItem>
						))}
				</List>
			</div>
		</motion.div>
	);
}

export default TeamworksPageSidebar;
