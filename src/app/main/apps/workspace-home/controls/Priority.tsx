import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	FormControl,
	Icon,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	OutlinedInput,
	Select,
	Typography
} from '@material-ui/core';
import { getPriorities, selectPriorities } from 'app/main/pages/teamworks/store/prioritiesSlice';
import { updateTeamworkPriority } from 'app/main/pages/teamworks/store/teamworkSlice';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import ITeamwork from 'models/Teamwork';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { item } from '../anim';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	priority: yup.string().required('You must select a priority')
});

const useStyles = makeStyles(theme => ({
	label: {
		color: theme.palette.text.hint
	}
}));

const Priority = () => {
	const dispatch = useDispatch();
	const priorities = useSelector(selectPriorities);
	const { priority }: ITeamwork = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork);

	useDeepCompareEffect(() => {
		dispatch(getPriorities());
	}, [dispatch]);

	const { control, setValue, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			priority
		},
		resolver: yupResolver(schema)
	});

	const classes = useStyles();
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		reset({
			priority
		});
	}, [formOpen, reset, priority]);

	function handleFormOpen(ev: MouseEvent<any>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleFormClose() {
		setFormOpen(false);
	}

	function onSubmit(result: { priority: string }) {
		dispatch(updateTeamworkPriority(result.priority));
		handleFormClose();
	}

	return (
		<motion.div variants={item} className="w-full py-12">
			{formOpen ? (
				<FormControl className="flex w-full sm:w-320" variant="outlined">
					<InputLabel htmlFor="priority-label-placeholder"> Priority </InputLabel>
					<Controller
						name="priority"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								label="Priority"
								placeholder="Select a priority.."
								autoFocus
								onChange={(e: ChangeEvent<any>) => {
									setValue('priority', e.target.value);
									handleSubmit(onSubmit)();
								}}
								onBlur={handleFormClose}
								input={
									<OutlinedInput
										labelWidth={'priority'.length * 6}
										name="priority"
										id="priority-label-placeholder"
									/>
								}
							>
								{priorities.map(p => (
									<MenuItem key={p.id} value={p.value}>
										{p.label}
									</MenuItem>
								))}
							</Select>
						)}
					/>
				</FormControl>
			) : (
				<div>
					<Typography
						className={clsx(classes.label, 'text-12 sm:text-14 font-medium cursor-pointer leading-3')}
						onClick={handleFormOpen}
					>
						Priority
					</Typography>
					<div className="flex items-center">
						<Typography
							className="text-16 sm:text-18 font-medium cursor-pointer py-10"
							onClick={handleFormOpen}
						>
							{priorities.find(p => p.value === priority)?.label}
						</Typography>
						<IconButton className="p-10" size="small" onClick={handleFormOpen}>
							<Icon>edit</Icon>
						</IconButton>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default Priority;
