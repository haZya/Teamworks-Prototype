import { Hidden, Icon, IconButton, makeStyles, Tooltip, Typography, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { MutableRefObject } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	headerIcon: {
		position: 'absolute',
		top: -64,
		right: 0,
		opacity: 0.04,
		pointerEvents: 'none',
		fontSize: '80vw',
		width: '80vw',
		height: '80vw',
		[theme.breakpoints.up('sm')]: {
			fontSize: 444,
			width: 444,
			height: 244
		}
	}
}));

interface IProps {
	pageLayout: MutableRefObject<any>;
}

const WorkspacePageHeader = ({ pageLayout }: IProps) => {
	const theme = useTheme();
	const classes = useStyles();

	return (
		<div className="flex flex-1 items-center -mt-12 w-full overflow-auto">
			<div className="flex flex-shrink items-center sm:w-224">
				<Tooltip title="Back to Teamworks">
					<IconButton to="/teamworks" component={Link}>
						<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
					</IconButton>
				</Tooltip>
				<Hidden lgUp>
					<IconButton onClick={ev => pageLayout.current.toggleLeftSidebar()} aria-label="open left sidebar">
						<Icon>menu</Icon>
					</IconButton>
				</Hidden>
				<div className="flex items-center">
					<Icon
						component={motion.span}
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.2 } }}
						className="text-24 md:text-32"
					>
						developer_board
					</Icon>
					<motion.span initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.2 } }}>
						<Typography className="flex text-16 md:text-24 mx-12 font-semibold">Workspace</Typography>
					</motion.span>
				</div>
			</div>
			<Icon className={classes.headerIcon}>developer_board</Icon>
		</div>
	);
};

export default WorkspacePageHeader;
