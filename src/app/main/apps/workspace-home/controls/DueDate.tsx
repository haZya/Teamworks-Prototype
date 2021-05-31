import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Icon, IconButton, InputAdornment, makeStyles, Typography } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { updateTeamworkDueDate } from 'app/main/pages/teamworks/store/teamworkSlice';
import clsx from 'clsx';
import format from 'date-fns/format';
import { motion } from 'framer-motion';
import ITeamwork from 'models/Teamwork';
import { MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { item } from '../anim';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	dueDate: yup.string().required('You must enter a due date')
});

const useStyles = makeStyles(theme => ({
	label: {
		color: theme.palette.text.hint
	}
}));

const DueDate = () => {
	const dispatch = useDispatch();
	const { startDate, dueDate }: ITeamwork = useSelector(
		({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork
	);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			dueDate
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields } = formState;
	const classes = useStyles();
	const [formOpen, setFormOpen] = useState(false);
	const [pickerOpen, setPickerOpen] = useState(false);

	useEffect(() => {
		reset({
			dueDate
		});
	}, [formOpen, reset, dueDate]);

	function handleFormOpen(ev: MouseEvent<any>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleFormClose() {
		setFormOpen(false);
	}

	function onSubmit(result: { dueDate: string }) {
		const date = new Date(result.dueDate);
		dispatch(updateTeamworkDueDate(date));
		handleFormClose();
	}

	return (
		<motion.div variants={item} className="sm:max-w-320 py-12">
			{formOpen ? (
				<form className="flex" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="dueDate"
						control={control}
						render={({ field: { onChange, value } }) => (
							<DateTimePicker
								className="w-full sm:w-320"
								label="Due Date"
								placeholder="Give a due date.."
								inputVariant="outlined"
								format="MMM dd, yyyy hh:mm a"
								minDate={startDate}
								autoFocus
								value={value}
								onChange={onChange}
								onOpen={() => setPickerOpen(true)}
								onClose={() => setPickerOpen(false)}
								onBlur={() => !pickerOpen && handleFormClose()}
								InputProps={{
									classes: {
										input: 'text-14 sm:text-16'
									},
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												type="submit"
												onMouseDown={e => e.preventDefault()}
												disabled={_.isEmpty(dirtyFields) || !isValid}
											>
												<Icon>check</Icon>
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						)}
					/>
				</form>
			) : (
				<div>
					<Typography
						className={clsx(classes.label, 'text-12 sm:text-14 font-medium cursor-pointer leading-3')}
						onClick={handleFormOpen}
					>
						Due Date
					</Typography>
					<div className="flex items-center">
						<Typography
							className="text-16 sm:text-18 font-medium cursor-pointer py-10"
							onClick={handleFormOpen}
						>
							{dueDate ? format(new Date(dueDate), 'MMM dd, yyyy hh:mm a') : 'None'}
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

export default DueDate;
