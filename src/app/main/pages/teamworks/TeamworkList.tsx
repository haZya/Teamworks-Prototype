import { useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import { getUsers } from 'app/main/apps/team/store/itemSlice';
import { isAfter, isBefore } from 'date-fns';
import { motion } from 'framer-motion';
import ITeamwork from 'models/Teamwork';
import { useEffect, useMemo, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getCategories, selectCategories } from './store/categoriesSlice';
import { getPriorities } from './store/prioritiesSlice';
import { getStatuses, selectStatuses } from './store/statusesSlice';
import { getTeamworks, IInitialState, selectTeamworks } from './store/teamworksSlice';
import TeamworkTile from './TeamworkTile';

function TeamworkList() {
	const dispatch = useDispatch();
	const teamworks = useSelector(selectTeamworks);
	const categories = useSelector(selectCategories);
	const statuses = useSelector(selectStatuses);
	const {
		searchText,
		orderBy,
		orderDescending,
		selectedCategory,
		selectedStartDate,
		selectedDueDate,
		selectedPriority,
		selectedStatus,
		hideCompleted
	}: IInitialState = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamworks);

	const [filteredData, setFilteredData] = useState<ITeamwork[]>([]);

	useDeepCompareEffect(() => {
		dispatch(getUsers());
		dispatch(getCategories());
		dispatch(getPriorities());
		dispatch(getStatuses());
		dispatch(getTeamworks());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray(): ITeamwork[] {
			if (
				searchText.length === 0 &&
				selectedCategory === 'all' &&
				selectedStartDate === null &&
				selectedDueDate === null &&
				selectedPriority === 'all' &&
				selectedStatus === 'all' &&
				hideCompleted === false
			) {
				return teamworks;
			}

			return _.filter(teamworks, item => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}

				if (
					selectedStartDate !== null &&
					item.startDate &&
					isBefore(new Date(item.startDate), new Date(selectedStartDate))
				) {
					return false;
				}

				if (
					selectedDueDate !== null &&
					item.dueDate &&
					isAfter(new Date(item.dueDate), new Date(selectedDueDate))
				) {
					return false;
				}

				if (selectedPriority !== 'all' && item.priority !== selectedPriority) {
					return false;
				}

				if (selectedStatus !== 'all') {
					if (
						selectedStatus === statuses[0].value &&
						item.startDate &&
						new Date(item.startDate) < new Date()
					) {
						// Not started
						return false;
					}

					if (
						selectedStatus === statuses[1].value &&
						(!item.startDate ||
							(item.startDate && new Date(item.startDate) > new Date()) ||
							(selectedStatus === statuses[1].value &&
								item.dueDate &&
								new Date(item.dueDate) < new Date()))
					) {
						return false;
					}

					if (
						selectedStatus === statuses[2].value &&
						(!item.dueDate || (item.dueDate && new Date(item.dueDate) > new Date()))
					) {
						// Completed
						return false;
					}
				}

				if (hideCompleted !== false && item.dueDate && new Date(item.dueDate) < new Date()) {
					return false;
				}
				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (teamworks) {
			setFilteredData(_.orderBy(getFilteredArray(), [orderBy], [orderDescending ? 'desc' : 'asc']));
		}
	}, [
		teamworks,
		statuses,
		searchText,
		orderBy,
		orderDescending,
		selectedCategory,
		selectedStartDate,
		selectedDueDate,
		selectedPriority,
		selectedStatus,
		hideCompleted
	]);

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full h-full">
			{useMemo(() => {
				const container = {
					show: {
						transition: {
							staggerChildren: 0.2
						}
					}
				};

				return (
					filteredData &&
					(filteredData.length > 0 ? (
						<motion.div
							className="flex flex-wrap py-24"
							variants={container}
							initial="hidden"
							animate="show"
						>
							{filteredData.map(teamwork => {
								const category = categories.filter(_cat => _cat.value === teamwork.category)[0];
								return <TeamworkTile key={teamwork.id} teamwork={teamwork} category={category} />;
							})}
						</motion.div>
					) : (
						<div className="flex flex-1 items-center justify-center">
							<Typography color="textSecondary" className="text-24 my-24">
								No teamworks found!
							</Typography>
						</div>
					))
				);
			}, [filteredData, categories])}
		</div>
	);
}

export default TeamworkList;
