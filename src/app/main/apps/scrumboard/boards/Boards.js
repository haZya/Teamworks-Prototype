import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import { darken, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../store';
import { getBoards, newBoard, resetBoards, selectBoards } from '../store/boardsSlice';

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles(theme => ({
	root: { background: darken(theme.palette.background.paper, 0.02) },
	board: {
		cursor: 'pointer',
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		background:
			theme.palette.type === 'dark' ? darken(theme.palette.background.paper, 0.2) : theme.palette.background.paper
	},
	newBoard: {}
}));

function Boards(props) {
	const dispatch = useDispatch();
	const boards = useSelector(selectBoards);

	const classes = useStyles(props);
	const routeParams = useParams();
	const toPath = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/:tab/:boardId/:boardUri?');

	useEffect(() => {
		dispatch(getBoards());
		return () => {
			dispatch(resetBoards());
		};
	}, [dispatch]);

	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center h-full overflow-auto')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
					<Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-bold" color="inherit">
						Scrumboard App
					</Typography>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="flex flex-wrap w-full justify-center py-32 px-16"
				>
					{boards.map(board => (
						<motion.div variants={item} className="w-224 h-224 p-16" key={board.id}>
							<Paper
								to={toPath({ ...routeParams, boardId: board.id, boardUri: board.uri })}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								component={Link}
							>
								<Icon className="text-56" color="action">
									assessment
								</Icon>
								<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
									{board.name}
								</Typography>
							</Paper>
						</motion.div>
					))}
					<motion.div variants={item} className="w-224 h-224 p-16">
						<Paper
							className={clsx(
								classes.board,
								classes.newBoard,
								'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg outline-none'
							)}
							onClick={() => dispatch(newBoard({}))}
							onKeyDown={() => dispatch(newBoard({}))}
							role="button"
							tabIndex={0}
						>
							<Icon className="text-56" color="secondary">
								add_circle
							</Icon>
							<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
								Add new board
							</Typography>
						</Paper>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}

export default withReducer('scrumboardApp', reducer)(Boards);
