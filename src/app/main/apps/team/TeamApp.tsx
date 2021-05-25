import { useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import { fade, Icon, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { getTeamwork } from 'app/main/pages/teamworks/store/teamworkSlice';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import ITeamList from 'models/Team';
import IUser from 'models/User';
import { Fragment, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import reducer from './store';
import { getUsers } from './store/itemSlice';
import reorder from './store/reorder';
import { getLists, reorderList, reorderTeam, resetLists } from './store/teamSlice';
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
	},
	transferIcon: {
		color: theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.background.paper,
		transform: 'rotate(90deg)',
		[theme.breakpoints.down('xs')]: {
			transform: 'rotate(0deg)'
		}
	}
}));

function getFilteredArray(entities: IUser[], _searchText: string) {
	if (_searchText.length === 0) {
		return entities;
	}
	return FuseUtils.filterArrayByString(entities, _searchText);
}

const TeamApp = () => {
	const classes = useStyles();
	const theme = useTheme();
	const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const [listDragging, setListDragging] = useState(false);

	const dispatch = useDispatch();
	const routeParams: any = useParams();
	const team: string[] = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork.team);
	const lists: ITeamList[] = useSelector(({ teamApp }: RootStateOrAny) => teamApp.team.lists);
	const users: IUser[] = useSelector(({ teamApp }: RootStateOrAny) => teamApp.items);
	const searchTextUsers = '';
	const searchTextTeam = '';

	const [filteredUserData, setFilteredUserData] = useState<IUser[]>([]);
	const [filteredTeamData, setFilteredTeamData] = useState<IUser[]>([]);

	const [availableUsers, setAvailableUsers] = useState<IUser[]>([]);
	const [teamMembers, setTeamMembers] = useState<IUser[]>([]);

	useEffect(() => {
		if (availableUsers) {
			setFilteredUserData(getFilteredArray(availableUsers, searchTextUsers));
		}
	}, [availableUsers, searchTextUsers]);

	useEffect(() => {
		if (users && team && teamMembers.length === 0) {
			const initialTeam = users.filter(u => team.includes(u.id));
			const sortedTeam = initialTeam.sort((a, b) => team.indexOf(a.id) - team.indexOf(b.id));
			setTeamMembers(sortedTeam);
		}
	}, [users, team, teamMembers]);

	useEffect(() => {
		if (users && team && availableUsers.length === 0) {
			setAvailableUsers(users.filter(user => !team.includes(user.id)));
		}
	}, [users, team, availableUsers]);

	useEffect(() => {
		if (teamMembers) {
			setFilteredTeamData(getFilteredArray(teamMembers, searchTextTeam));
		}
	}, [teamMembers, searchTextTeam]);

	useDeepCompareEffect(() => {
		dispatch(getLists());
		dispatch(getUsers());
		dispatch(getTeamwork({ teamworksId: routeParams.teamworkId }));
		return () => {
			dispatch(resetLists());
		};
	}, [dispatch]);

	function onDragEnd(result: DropResult) {
		setListDragging(false);
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
		if (result.type === 'card') {
			let newTeam: string[] = [];
			let userMoved: IUser;

			if (source.droppableId !== destination?.droppableId) {
				if (destination?.droppableId === '1') {
					// Available users list
					userMoved = filteredTeamData[source.index];
					setFilteredUserData([
						...filteredUserData.slice(0, destination.index),
						userMoved,
						...filteredUserData.slice(destination.index)
					]);
					setFilteredTeamData(filteredTeamData.filter(user => user !== userMoved));
					newTeam = team.filter(tmId => tmId !== userMoved.id);
				} else if (destination?.droppableId === '2') {
					// Team members list
					userMoved = filteredUserData[source.index];
					setFilteredTeamData([
						...filteredTeamData.slice(0, destination.index),
						userMoved,
						...filteredTeamData.slice(destination.index)
					]);
					setFilteredUserData(filteredUserData.filter(user => user !== userMoved));

					const userId = filteredTeamData[destination.index]?.id || undefined;
					const index = userId ? team.indexOf(userId) : team.length;
					newTeam = Object.assign([], team);
					newTeam.splice(index, 0, userMoved.id);
				}

				dispatch(reorderTeam(newTeam));
				dispatch(getTeamwork({ teamworksId: routeParams.teamworkId }));
			} else if (destination?.droppableId === '1') {
				// Available users list
				setFilteredUserData(reorder(filteredUserData, source.index, destination.index));
			} else if (destination?.droppableId === '2') {
				// Team members list
				setFilteredTeamData(reorder(filteredTeamData, source.index, destination.index));

				const src = filteredTeamData[source.index];
				const dest = filteredTeamData[destination.index];

				const srcIndex = team.indexOf(src.id);
				const destIndex = team.indexOf(dest.id);

				// newTeam = Object.assign([], team);
				// newTeam[srcIndex] = dest.id;
				// newTeam[destIndex] = src.id;

				newTeam = reorder(team, srcIndex, destIndex);

				dispatch(reorderTeam(newTeam));
				dispatch(getTeamwork({ teamworksId: routeParams.teamworkId }));
			}
		}
	}

	const contentCardRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<string | number>(320);
	const [height, setHeight] = useState<string | number>('100%');
	const widthOffset = smDown ? 72 : 122;
	const heightOffset = 62;

	useEffect(() => {
		const resizeListener = () => {
			if (contentCardRef.current) {
				setWidth((contentCardRef.current.clientWidth - (xsDown ? 0 : widthOffset)) / (xsDown ? 1 : 2));
				xsDown ? setHeight((contentCardRef.current.clientHeight - heightOffset) / 2) : setHeight('100%');
			}
		};

		// Set initial size
		resizeListener();

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
								<DragDropContext
									onBeforeDragStart={initial => initial.type === 'list' && setListDragging(true)}
									onDragEnd={onDragEnd}
								>
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
												} flex container py-0 md:py-24 px-0 md:px-12 w-full`}
											>
												{lists.map((list, index) => (
													<Fragment key={list.id}>
														<TeamAppList
															list={list}
															index={index}
															width={width}
															height={height}
															listItems={
																list.id === '1' ? filteredUserData : filteredTeamData
															}
														/>
														{index === 0 && (
															<Icon
																className={clsx(
																	classes.transferIcon,
																	'text-44 m-auto',
																	listDragging && 'hidden'
																)}
															>
																import_export
															</Icon>
														)}
													</Fragment>
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
