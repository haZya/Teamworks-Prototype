import { Button, Card, CardActions, CardContent, Icon, LinearProgress, Typography, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
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

interface IProps {
	teamwork: any;
	category: any;
}

const TeamworkTile = ({ teamwork, category }: IProps) => {
	const theme = useTheme();

	function buttonStatus(teamworkItem: any) {
		switch (teamworkItem.activeStep) {
			case teamworkItem.totalSteps:
				return 'Completed';
			case 0:
				return 'Start';
			default:
				return 'Continue';
		}
	}

	return (
		<motion.div variants={item} className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16">
			<Card className="flex flex-col h-256 shadow">
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
						<div className="text-14 font-medium whitespace-nowrap">
							{teamwork.length}
							min
						</div>
					</div>
				</div>
				<CardContent className="flex flex-col flex-auto items-center justify-center">
					<Typography className="text-center text-16 font-medium">{teamwork.title}</Typography>
					<Typography className="text-center text-13 mt-8 font-normal" color="textSecondary">
						{teamwork.updated}
					</Typography>
				</CardContent>
				<CardActions className="justify-center pb-24">
					<Button
						to={`/teamworks/${teamwork.id}/${teamwork.slug}`}
						component={Link}
						className="justify-start px-32"
						variant="outlined"
					>
						{buttonStatus(teamwork)}
					</Button>
				</CardActions>
				<LinearProgress
					className="w-full"
					variant="determinate"
					value={(teamwork.activeStep * 100) / teamwork.totalSteps}
					color="secondary"
				/>
			</Card>
		</motion.div>
	);
};

export default TeamworkTile;
