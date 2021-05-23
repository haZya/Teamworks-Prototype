import { useDeepCompareEffect } from '@fuse/hooks';
import { fade, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import ITeamList from 'models/Team';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { getLists, reorderList, resetLists } from './store/teamSlice';
import TeamAppList from './TeamAppList';

const drawerWidth = 400;
const headerHeight = 200;

const useStyles = makeStyles(theme => ({
	'@global': {
		'#fuse-main': {
			height: '100vh'
		}
	},
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 1 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	topBg: {
		zIndex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: theme.palette.primary.dark,
		backgroundSize: 'cover',
		pointerEvents: 'none'
	},
	contentCardWrapper: {
		position: 'relative',
		padding: 24,
		maxWidth: 1400,
		display: 'flex',
		flexDirection: 'column',
		flex: '1 0 auto',
		width: '100%',
		minWidth: '0',
		maxHeight: '100%',
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			padding: 16
		},
		[theme.breakpoints.down('xs')]: {
			padding: 12
		},
		background: fade(theme.palette.background.paper, 0.6)
	},
	contentCard: {
		zIndex: 2,
		display: 'flex',
		position: 'relative',
		flex: '1 1 100%',
		flexDirection: 'row',
		backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
		backgroundColor: theme.palette.background.paper,
		minHeight: 0,
		overflow: 'auto'
	},
	drawerPaper: {
		width: drawerWidth,
		maxWidth: '100%',
		overflow: 'hidden',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		zIndex: 10,
		background: `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(
			theme.palette.background.paper,
			0.6
		)} 20%,${fade(theme.palette.background.paper, 0.8)})`
	},
	content: {
		display: 'flex',
		flex: '1 1 100%',
		minHeight: 0
	}
}));

const TeamApp = () => {
	const classes = useStyles();
	const theme = useTheme();
	const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

	const dispatch = useDispatch();
	const lists: ITeamList[] = useSelector(({ teamApp }: RootStateOrAny) => teamApp.team.lists);

	useDeepCompareEffect(() => {
		dispatch(getLists());
		return () => {
			dispatch(resetLists());
		};
	}, [dispatch]);

	function onDragEnd(result: DropResult) {
		const { source, destination } = result;

		// dropped nowhere
		if (!destination) {
			return;
		}

		// did not move anywhere - can bail early
		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return;
		}

		// reordering list
		if (result.type === 'list') {
			dispatch(reorderList(result));
		}

		// reordering card
		// if (result.type === 'card') {
		// 	dispatch(reorderCard(result));
		// }
	}

	const contentCardRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<number>(320);
	const widthOffset = xsDown ? 32 : 72;

	useEffect(() => {
		contentCardRef.current && setWidth((contentCardRef.current.clientWidth - widthOffset) / (xsDown ? 1 : 2));

		const resizeListener = () => {
			contentCardRef.current && setWidth((contentCardRef.current.clientWidth - widthOffset) / (xsDown ? 1 : 2));
		};

		// set resize listener
		window.addEventListener('resize', resizeListener);

		// clean up function
		return () => {
			// remove resize listener
			window.removeEventListener('resize', resizeListener);
		};
	}, [contentCardRef, widthOffset, xsDown, width]);

	return (
		<div className={clsx(classes.root)}>
			<div className={classes.topBg} />

			<div className={clsx(classes.contentCardWrapper, 'container')}>
				<div ref={contentCardRef} className={clsx(classes.contentCard, 'shadow rounded-20')}>
					<main className={clsx(classes.contentWrapper, 'z-10')}>
						<div className={classes.content}>
							<div className="flex flex-1 overflow-x-auto overflow-y-hidden">
								<DragDropContext onDragEnd={onDragEnd}>
									<Droppable
										droppableId="list"
										type="list"
										direction={xsDown ? 'vertical' : 'horizontal'}
									>
										{provided => (
											<div
												ref={provided.innerRef}
												className={`${
													xsDown ? 'flex-col' : 'flex-row'
												} flex container py-16 md:py-24 px-8 sm:px-12 w-full`}
											>
												{lists.map((list, index) => (
													<TeamAppList
														key={list.id}
														list={list}
														index={index}
														width={width}
													/>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default withReducer('teamApp', reducer)(TeamApp);
