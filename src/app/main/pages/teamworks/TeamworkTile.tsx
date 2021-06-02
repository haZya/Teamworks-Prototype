import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Drawer,
	Icon,
	IconButton,
	LinearProgress,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Tooltip,
	Typography,
	useTheme
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import clsx from 'clsx';
import { differenceInMilliseconds, format, formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import ITeamwork, { ICategory } from 'models/Teamwork';
import IUser from 'models/User';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPriorities } from './store/prioritiesSlice';

const drawerWidth = 140;

const useStyles = makeStyles(theme => ({
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7)
	},
	listItem: {
		'&:hover': {
			'& $listItemIcon, $listItemText': {
				color: theme.palette.secondary.main
			}
		}
	},
	listItemIcon: {
		minWidth: 40
	},
	listItemText: {}
}));

const item = {
	hidden: {
		opacity: 0,
		y: 20
	},
	show: {
		opacity: 1,
		y: 0
	}
};

const drawerListItems = [
	{ label: 'Home', tab: 'home', icon: 'apps' },
	{ label: 'Team', tab: 'team', icon: 'group' },
	{ label: 'Email', tab: 'email', icon: 'email' },
	{ label: 'Chat', tab: 'chat', icon: 'chat' },
	{ label: 'Calendar', tab: 'calendar', icon: 'event' },
	{ label: 'Files', tab: 'files', icon: 'file_copy' },
	{ label: 'Tasks', tab: 'tasks', icon: 'assignment_turned_in' },
	{ label: 'Project', tab: 'project', icon: 'account_tree' },
	{ label: 'To-Do', tab: 'to-do', icon: 'format_list_bulleted' },
	{ label: 'Notes', tab: 'notes', icon: 'notes' }
];

interface IProps {
	teamwork: ITeamwork;
	category: ICategory;
}

const TeamworkTile = ({ teamwork, category }: IProps) => {
	const theme = useTheme();
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const priorities = useSelector(selectPriorities);
	const users: IUser[] = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.users);
	const [team, setTeam] = useState<IUser[]>([]);

	useEffect(() => {
		if (users) {
			setTeam(users.filter(u => teamwork.team.includes(u.id)));
		}
	}, [users, teamwork.team]);

	const dateNow = new Date();
	const priority = priorities.find(p => p.value === teamwork.priority);

	function getTimeLeft() {
		const distance = teamwork.dueDate && formatDistance(new Date(teamwork.dueDate), dateNow, { addSuffix: true });
		return distance;
	}

	function getButtonStatus() {
		if (!teamwork.startDate || new Date(teamwork.startDate) > dateNow) {
			return 'Start';
		}

		if (teamwork.dueDate && new Date(teamwork.dueDate) < dateNow) {
			return 'Completed';
		}

		return 'Continue';
	}

	function getProgress() {
		if (teamwork.startDate && teamwork.dueDate) {
			const currentProgressInMs = differenceInMilliseconds(dateNow, new Date(teamwork.startDate));
			const overallLengthInMs = differenceInMilliseconds(
				new Date(teamwork.dueDate),
				new Date(teamwork.startDate)
			);
			const progress = (currentProgressInMs / overallLengthInMs) * 100;
			return progress > 100 ? 100 : progress < 0 ? 0 : progress;
		}

		return 0;
	}

	return (
		<motion.div variants={item} className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-12">
			<Card className="flex flex-col shadow">
				<div
					className="flex flex-shrink-0 items-center justify-between px-16 h-64"
					style={{
						background: category.color,
						color: theme.palette.getContrastText(category.color)
					}}
				>
					<Typography className="font-medium truncate" color="inherit">
						{category.label}
					</Typography>
					<div className="flex items-center justify-center opacity-75">
						<Icon className="text-20 mx-8" color="inherit">
							access_time
						</Icon>
						<div className="text-14 font-medium whitespace-nowrap">Due {getTimeLeft()}</div>
					</div>
					{!open ? (
						<IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="end">
							{theme.direction === 'rtl' ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon>}
						</IconButton>
					) : (
						<IconButton color="inherit" aria-label="close drawer" onClick={handleDrawerClose} edge="end">
							{theme.direction === 'rtl' ? <Icon>chevron_left</Icon> : <Icon>chevron_right</Icon>}
						</IconButton>
					)}
				</div>

				<div className="flex">
					<div className="min-w-0 w-full">
						<CardContent className="flex flex-col flex-auto items-center justify-center h-auto sm:h-320">
							<Typography className="text-center text-16 font-medium line-clamp-3 min-h-48">
								{teamwork.title}
							</Typography>
							<Typography
								className="text-center text-14 font-normal line-clamp-3 min-h-68 max-h-68 py-8"
								color="textSecondary"
							>
								{teamwork.description}
							</Typography>
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-16 w-full my-auto mt-12">
								<div className="text-center text-13 line-clamp-4">
									<Typography className="mt-8 font-medium">Start</Typography>
									<Typography className="font-normal" color="textSecondary">
										{teamwork.startDate
											? format(new Date(teamwork.startDate), 'MMM dd, yyyy hh:mm a')
											: 'None'}
									</Typography>
								</div>

								<div className="text-center text-13 line-clamp-4">
									<Typography className="mt-8 font-medium">Due</Typography>
									<Typography className="font-normal" color="textSecondary">
										{teamwork.dueDate
											? format(new Date(teamwork.dueDate), 'MMM dd, yyyy hh:mm a')
											: 'None'}
									</Typography>
								</div>

								<div className="text-center text-13 line-clamp-4">
									<Typography className="mt-8 font-medium">Priority</Typography>
									<Typography className="font-medium text-14" style={{ color: priority?.color }}>
										{priority?.label}
									</Typography>
								</div>
							</div>
							<div className="mt-16 flex mx-auto sm:ml-12">
								<div>
									<Divider />
									<Typography className="my-8 font-medium">Team:</Typography>
									{team.length > 0 ? (
										<AvatarGroup max={4}>
											{team.map(t => (
												<Tooltip key={t.id} title={t.name}>
													<Avatar alt={t.name} src={t.avatar} />
												</Tooltip>
											))}
										</AvatarGroup>
									) : (
										<Typography className="my-8 font-medium">No Team Members</Typography>
									)}
								</div>
							</div>
						</CardContent>
						<CardActions className="justify-center pb-24 pt-20">
							<Button
								to={`/teamworks/${teamwork.id}/${teamwork.slug}`}
								component={Link}
								className="justify-start px-32"
								variant="outlined"
							>
								{getButtonStatus()}
							</Button>
						</CardActions>
					</div>

					<Drawer
						variant="permanent"
						className={clsx(classes.drawer, 'shadow border border-y-0 border-r-0', {
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open
						})}
						classes={{
							paper: clsx('relative', {
								[classes.drawerOpen]: open,
								[classes.drawerClose]: !open
							})
						}}
					>
						<List className="p-0">
							{drawerListItems.map((_item, index) => (
								<Tooltip key={_item.label} title={_item.label}>
									<>
										{index !== 0 && <Divider />}
										<ListItem
											button
											className={clsx(classes.listItem, 'py-6')}
											to={`/teamworks/${teamwork.id}/${teamwork.slug}/${_item.tab}`}
											component={Link}
										>
											<ListItemIcon className={classes.listItemIcon}>
												<Icon>{_item.icon}</Icon>
											</ListItemIcon>
											<ListItemText primary={_item.label} className={classes.listItemText} />
										</ListItem>
									</>
								</Tooltip>
							))}
						</List>
					</Drawer>
				</div>
				<LinearProgress className="w-full" variant="determinate" value={getProgress()} color="secondary" />
			</Card>
		</motion.div>
	);
};

export default TeamworkTile;
