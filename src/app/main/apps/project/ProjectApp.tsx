import { useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { ClickAwayListener, Fab, Icon, IconButton, makeStyles, Tooltip, Zoom } from '@material-ui/core';
import themesConfig from 'app/fuse-configs/themesConfig';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { addDays } from 'date-fns';
import { motion } from 'framer-motion';
import IProject from 'models/Project';
import ITeamwork from 'models/Teamwork';
import { useEffect, useState } from 'react';
import TimeLine, { Config, Link, Mode, Task } from 'react-gantt-timeline';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import {
	addProjectLink,
	addProjectTask,
	getProject,
	removeLinks,
	removeTask,
	setSelectedItem,
	updateProjectData
} from './store/projectSlice';

const useStyles = makeStyles(theme => ({
	topBg: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
	}
}));

interface IMode {
	mode: Mode;
	title: string;
	icon: string;
}

const modes: IMode[] = [
	{
		mode: 'year',
		title: 'Year',
		icon: 'event_available'
	},
	{
		mode: 'month',
		title: 'Month',
		icon: 'event_note'
	},
	{
		mode: 'week',
		title: 'Week',
		icon: 'date_range'
	},
	{
		mode: 'day',
		title: 'Day',
		icon: 'event'
	}
];

const ProjectApp = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const mainTheme = useSelector(selectMainTheme);
	const { projectId }: ITeamwork = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork);
	const project: IProject = useSelector(({ projectApp }: RootStateOrAny) => projectApp.projects.project);
	const selectedItem = useSelector(({ projectApp }: RootStateOrAny) => projectApp.projects.selectedItem);

	useDeepCompareEffect(() => {
		dispatch(getProject({ projectId }));
	}, [dispatch, projectId]);

	const config: Config = {
		header: {
			top: {
				style: {
					background: `linear-gradient(to right, ${mainTheme.palette.primary.dark} 0%, ${mainTheme.palette.primary.light} 100%)`,
					color: mainTheme.palette.primary.contrastText,
					fontSize: 12
				}
			},
			middle: {
				style: {
					background: `linear-gradient(to right, ${mainTheme.palette.primary.dark} 0%, ${mainTheme.palette.primary.light} 100%)`,
					color: mainTheme.palette.primary.contrastText,
					fontSize: 9
				}
			},
			bottom: {
				style: {
					background: `linear-gradient(to right, ${mainTheme.palette.primary.dark} 0%, ${mainTheme.palette.primary.light} 100%)`,
					color: mainTheme.palette.primary.contrastText,
					fontSize: 9
				},
				selectedStyle: {
					backgroundColor: mainTheme.palette.secondary.main,
					color: mainTheme.palette.primary.contrastText,
					fontWeight: 'bold'
				}
			}
		},
		taskList: {
			title: {
				label: 'Project Gantt Chart',
				style: {
					backgroundColor: mainTheme.palette.primary.dark,
					color: mainTheme.palette.primary.contrastText,
					fontSize: 14
				}
			},
			task: {
				style: {
					backgroundColor: mainTheme.palette.background.paper,
					color:
						mainTheme.palette.type === 'dark'
							? mainTheme.palette.text.disabled
							: mainTheme.palette.text.primary,
					borderBottom: mainTheme.palette.type === 'dark' ? `none` : `solid 0.5px silver`
				}
			},
			verticalSeparator: {
				style: {
					backgroundColor: mainTheme.palette.primary.main
				},
				grip: {
					style: {
						backgroundColor: mainTheme.palette.secondary.main
					}
				}
			}
		},
		dataViewPort: {
			rows: {
				style: {
					backgroundColor: mainTheme.palette.background.paper,
					borderBottom: mainTheme.palette.type === 'dark' ? `none` : `solid 0.5px silver`
				}
			},
			task: {
				showLabel: true,
				style: {
					cursor: 'grab',
					backgroundColor: mainTheme.palette.secondary.dark,
					borderRadius: 4
				},
				selectedStyle: {
					backgroundColor: mainTheme.palette.secondary.dark,
					boxShadow: `1px 1px 8px ${mainTheme.palette.secondary.dark}`,
					border: 'none'
				}
			}
		},
		links: {
			color: mainTheme.palette.primary.main,
			selectedColor: mainTheme.palette.secondary.main
		}
	};

	const [render, setRender] = useState(true);

	useEffect(() => {
		setRender(false);
	}, [mainTheme.palette]);

	useEffect(() => {
		if (!render) {
			setRender(!render);
		}
	}, [render]);

	const handleSelectItem = (item: Task | Link) => {
		dispatch(setSelectedItem(item));
	};

	const handleAddTask = () => {
		const newTask: Task = {
			id: FuseUtils.generateGUID(),
			start: new Date(),
			end: addDays(new Date(), 7),
			name: 'New Task',
			color: _.sample(themesConfig)?.palette.secondary.main
		};

		const index = project.data.indexOf(selectedItem as Task) + 1;
		dispatch(addProjectTask({ index, task: newTask }));
	};

	const handleUpdateTask = (item: Task, props: Task) => {
		if (
			(!props.start || _.isEqual(new Date(item.start), new Date(props.start))) &&
			(!props.end || _.isEqual(new Date(item.end), new Date(props.end))) &&
			(!props.name || props.name === item.name)
		) {
			return;
		}

		const _item = { ...item };

		_item.start = props.start ? props.start : item.start;
		_item.end = props.end ? props.end : item.end;
		_item.name = props.name ? props.name : item.name;

		dispatch(updateProjectData(_item));
	};

	const handleCreateLink = (item: any) => {
		const newLink: Link = {
			id: FuseUtils.generateGUID(),
			start: item.start.task.id,
			end: item.end.task.id
		};

		dispatch(addProjectLink(newLink));
		dispatch(setSelectedItem(newLink));
	};

	const handleDeleteTask = () => {
		if (selectedItem) {
			let index = project.links.indexOf(selectedItem as Link);

			if (index > -1) {
				const link = project.links[index];
				dispatch(removeLinks({ linkIds: [link.id] }));
			}

			index = project.data.indexOf(selectedItem as Task);
			if (index > -1) {
				const task = project.data[index];
				dispatch(removeTask(task.id));

				const linksAssoc = project.links.filter(l => l.start === task.id || l.end === task.id).map(l => l.id);
				dispatch(removeLinks({ linkIds: linksAssoc }));
			}
		}
	};

	const [mode, setMode] = useState<Mode>('month');

	return (
		<>
			{render ? (
				<>
					<div
						className={clsx(
							classes.topBg,
							'flex flex-col sm:flex-row justify-between items-center py-12 px-16'
						)}
					>
						<div className="flex">
							{modes.map(m => (
								<Tooltip title={m.title} key={m.mode}>
									<div>
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1, transition: { delay: 0.3 } }}
										>
											<IconButton
												aria-label={m.title}
												onClick={() => setMode(m.mode)}
												disabled={m.mode === mode}
												color="secondary"
											>
												<Icon className={mode === m.mode ? 'text-grey' : 'text-white'}>
													{m.icon}
												</Icon>
											</IconButton>
										</motion.div>
									</div>
								</Tooltip>
							))}
						</div>

						<div className="pb-12 sm:pb-0">
							<Zoom in unmountOnExit>
								<Tooltip title="Add Task">
									<Fab aria-label="add" color="secondary" size="small" onClick={handleAddTask}>
										<Icon>add</Icon>
									</Fab>
								</Tooltip>
							</Zoom>
							<Zoom in unmountOnExit>
								<Tooltip title="Remove Task / Link">
									<Fab
										className="ml-12 mr-8 sm:mr-12"
										aria-label="remove"
										color="default"
										size="small"
										onClick={handleDeleteTask}
									>
										<Icon>remove</Icon>
									</Fab>
								</Tooltip>
							</Zoom>
						</div>
					</div>

					<div>
						<ClickAwayListener onClickAway={() => selectedItem && dispatch(setSelectedItem(null))}>
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
							>
								<TimeLine
									data={project?.data || []}
									links={project?.links || []}
									config={config}
									mode={mode}
									selectedItem={selectedItem}
									onSelectItem={handleSelectItem}
									onUpdateTask={handleUpdateTask}
									onCreateLink={handleCreateLink}
								/>
							</motion.div>
						</ClickAwayListener>
					</div>
				</>
			) : null}
		</>
	);
};

export default withReducer('projectApp', reducer)(ProjectApp);
