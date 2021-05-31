import {
	FormControlLabel,
	Icon,
	IconButton,
	InputLabel,
	OutlinedInput,
	Switch,
	useMediaQuery,
	useTheme
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ICategory, IPriority } from 'models/Teamwork';
import { ChangeEvent } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { selectCategories } from './store/categoriesSlice';
import { selectPriorities } from './store/prioritiesSlice';
import {
	changeOrder,
	IInitialState,
	setHideCompleted,
	setSelectedCategory,
	setSelectedDueDate,
	setSelectedPriority,
	setSelectedStartDate,
	toggleOrderDescending
} from './store/teamworksSlice';

function TeamworksPageToolbar() {
	const dispatch = useDispatch();
	const categories: ICategory[] = useSelector(selectCategories);
	const priorities: IPriority[] = useSelector(selectPriorities);
	const {
		orderBy,
		orderDescending,
		selectedCategory,
		selectedStartDate,
		selectedDueDate,
		selectedPriority,
		hideCompleted
	}: IInitialState = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamworks);

	function handleOrderChange(ev: ChangeEvent<any>) {
		dispatch(changeOrder(ev.target.value));
	}

	function handleSelectedCategory(event: ChangeEvent<any>) {
		dispatch(setSelectedCategory(event.target.value));
	}

	function handleSelectedStartDate(date: MaterialUiPickersDate) {
		date && dispatch(setSelectedStartDate(new Date(date.toString())));
	}

	function handleSelectedDueDate(date: MaterialUiPickersDate) {
		date && dispatch(setSelectedDueDate(new Date(date.toString())));
	}

	function handleSelectedPriority(event: ChangeEvent<any>) {
		dispatch(setSelectedPriority(event.target.value));
	}

	const theme = useTheme();
	const xssDown = useMediaQuery(theme.breakpoints.down(360));

	return (
		<motion.div
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			className="w-full"
		>
			<div className="flex w-full items-center justify-end py-8">
				<FormControlLabel
					className={clsx(xssDown ? 'hidden' : 'block', 'mr-24')}
					control={
						<Switch
							name="hide-completed"
							checked={hideCompleted}
							onChange={() => dispatch(setHideCompleted())}
						/>
					}
					label="Hide completed"
				/>
				<FormControl>
					<Select value={orderBy} onChange={handleOrderChange} displayEmpty name="filter">
						<MenuItem value="">
							<em>Order by</em>
						</MenuItem>
						<MenuItem value="startDate">Start Date</MenuItem>
						<MenuItem value="dueDate">Due Date</MenuItem>
						<MenuItem value="category">Category</MenuItem>
						<MenuItem value="priority">Priority</MenuItem>
						<MenuItem value="title">Title</MenuItem>
					</Select>
				</FormControl>
				<IconButton onClick={() => dispatch(toggleOrderDescending())}>
					<Icon style={{ transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)' }}>sort</Icon>
				</IconButton>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16 w-full items-center">
				<FormControl className="mt-4" variant="outlined">
					<InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
					<Select
						value={selectedCategory}
						onChange={handleSelectedCategory}
						input={
							<OutlinedInput
								margin="dense"
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
				</FormControl>
				<FormControl>
					<DateTimePicker
						label="Start Date"
						placeholder="Select a start date.."
						inputVariant="outlined"
						margin="dense"
						format="MMM dd, yyyy hh:mm a"
						value={selectedStartDate}
						onChange={handleSelectedStartDate}
					/>
				</FormControl>
				<FormControl>
					<DateTimePicker
						label="Due Date"
						placeholder="Select a due date.."
						inputVariant="outlined"
						margin="dense"
						format="MMM dd, yyyy hh:mm a"
						value={selectedDueDate}
						onChange={handleSelectedDueDate}
					/>
				</FormControl>
				<FormControl className="mt-4" variant="outlined">
					<InputLabel htmlFor="category-label-placeholder"> Priority </InputLabel>
					<Select
						value={selectedPriority}
						onChange={handleSelectedPriority}
						input={
							<OutlinedInput
								margin="dense"
								labelWidth={'priority'.length * 6}
								name="priority"
								id="priority-label-placeholder"
							/>
						}
					>
						<MenuItem value="all">
							<em> All </em>
						</MenuItem>
						{priorities.map(priority => (
							<MenuItem value={priority.value} key={priority.id}>
								{priority.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		</motion.div>
	);
}

export default TeamworksPageToolbar;
