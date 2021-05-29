import _ from '@lodash';
import { Typography } from '@material-ui/core';
import { isAfter, isBefore } from 'date-fns';
import { motion } from 'framer-motion';
import ITeamwork, { ICategory } from 'models/Teamwork';
import { useEffect, useMemo, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getCategories, selectCategories } from './store/categoriesSlice';
import { getPriorities } from './store/prioritiesSlice';
import { getTeamworks, IInitialState, selectTeamworks } from './store/teamworksSlice';
import TeamworkTile from './TeamworkTile';

function TeamworkList() {
	const dispatch = useDispatch();
	const teamworks: ITeamwork[] = useSelector(selectTeamworks);
	const categories: ICategory[] = useSelector(selectCategories);
	const {
		searchText,
		orderBy,
		orderDescending,
		selectedCategory,
		selectedStartDate,
		selectedDueDate,
		selectedPriority
	}: IInitialState = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamworks);

	const [filteredData, setFilteredData] = useState<ITeamwork[]>([]);

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getPriorities());
		dispatch(getTeamworks());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (
				searchText.length === 0 &&
				selectedCategory === 'all' &&
				selectedStartDate === null &&
				selectedDueDate === null &&
				selectedPriority === 'all'
			) {
				return teamworks;
			}

			return _.filter(teamworks, item => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}

				if (selectedStartDate !== null && isBefore(new Date(item.startDate), new Date(selectedStartDate))) {
					return false;
				}

				if (selectedDueDate !== null && isAfter(new Date(item.dueDate), new Date(selectedDueDate))) {
					return false;
				}

				if (selectedPriority !== 'all' && item.priority !== selectedPriority) {
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
		searchText,
		orderBy,
		orderDescending,
		selectedCategory,
		selectedStartDate,
		selectedDueDate,
		selectedPriority
	]);

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between">
				{/* <TextField
					label="Search for a teamwork"
					placeholder="Enter a keyword..."
					className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
					value={searchText}
					inputProps={{
						'aria-label': 'Search'
					}}
					onChange={handleSearchText}
					variant="outlined"
					InputLabelProps={{
						shrink: true
					}}
				/> */}
				{/* <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
					<InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
					<Select
						value={selectedCategory}
						onChange={handleSelectedCategory}
						input={
							<OutlinedInput
								labelWidth={'category'.length * 9}
								name="category"
								id="category-label-placeholder"
							/>
						}
					>
						<MenuItem value="all">
							<em> All </em>
						</MenuItem>
						{categories.map(category => (
							<MenuItem value={category.value} key={category.id}>
								{category.label}
							</MenuItem>
						))}
					</Select>
				</FormControl> */}
			</div>
			{useMemo(() => {
				const container = {
					show: {
						transition: {
							staggerChildren: 0.1
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
