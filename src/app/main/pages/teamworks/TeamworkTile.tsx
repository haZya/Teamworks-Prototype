import { useDeepCompareEffect } from '@fuse/hooks';
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Icon,
	LinearProgress,
	makeStyles,
	Typography,
	useTheme
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { getUsers } from 'app/main/apps/team/store/itemSlice';
import { differenceInMilliseconds, formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import ITeamwork, { ICategory } from 'models/Teamwork';
import IUser from 'models/User';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

const useStyles = makeStyles(theme => ({
	description: {
		color: theme.palette.text.hint
	}
}));

interface IProps {
	teamwork: ITeamwork;
	category: ICategory;
}

const TeamworkTile = ({ teamwork, category }: IProps) => {
	const theme = useTheme();
	const classes = useStyles();

	const dispatch = useDispatch();
	const users: IUser[] = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.users);
	const [team, setTeam] = useState<IUser[]>([]);

	useDeepCompareEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		if (users) {
			setTeam(users.filter(u => teamwork.team.includes(u.id)));
		}
	}, [users, teamwork.team]);

	const dateNow = new Date();

	function getTimeLeft() {
		const distance = formatDistance(new Date(teamwork.dueDate), dateNow, { addSuffix: true });
		return distance;
	}

	function getButtonStatus() {
		if (new Date(teamwork.startDate) > dateNow) {
			return 'Start';
		}

		if (new Date(teamwork.dueDate) < dateNow) {
			return 'Completed';
		}

		return 'Continue';
	}

	function getProgress() {
		const currentProgressInMs = differenceInMilliseconds(dateNow, new Date(teamwork.startDate));
		const overallLengthInMs = differenceInMilliseconds(new Date(teamwork.dueDate), new Date(teamwork.startDate));
		const progress = (currentProgressInMs / overallLengthInMs) * 100;
		return progress > 100 ? 100 : progress < 0 ? 0 : progress;
	}

	return (
		<motion.div variants={item} className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16">
			<Card className="flex flex-col shadow">
				<div
					className="flex flex-shrink-0 items-center justify-between px-24 h-64"
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
				</div>
				<CardContent className="flex flex-col flex-auto items-center justify-center h-auto sm:h-320">
					<Typography className="text-center text-16 font-medium">{teamwork.title}</Typography>
					<Typography className="text-center text-14 font-normal line-clamp-3 my-8" color="textSecondary">
						{teamwork.description}
					</Typography>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-16 w-full my-auto">
						<div className="text-center text-13">
							<Typography className="mt-8 font-medium">Start</Typography>
							<Typography className="font-normal" color="textSecondary">
								{teamwork.startDate}
							</Typography>
						</div>

						<div className="text-center text-13">
							<Typography className="mt-8 font-medium">Due</Typography>
							<Typography className="font-normal" color="textSecondary">
								{teamwork.dueDate}
							</Typography>
						</div>

						<div className="text-center text-13">
							<Typography className="mt-8 font-medium">Priority</Typography>
							<Typography className="font-normal" color="textSecondary">
								{teamwork.priority}
							</Typography>
						</div>
					</div>
					<div className="mt-16 sm:pl-12 flex mr-auto">
						<div>
							<Divider />
							<Typography className="my-8 font-medium">Team:</Typography>
							<AvatarGroup max={4}>
								{team.map(t => (
									<Avatar key={t.id} alt={t.name} src={t.avatar} />
								))}
							</AvatarGroup>
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
				<LinearProgress className="w-full" variant="determinate" value={getProgress()} color="secondary" />
			</Card>
		</motion.div>
	);
};

export default TeamworkTile;
