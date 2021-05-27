import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Icon, IconButton, InputAdornment, makeStyles, Typography } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import ITeamwork from 'models/Teamwork';
import { MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RootStateOrAny, useSelector } from 'react-redux';
import * as yup from 'yup';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	startDate: yup.string().required('You must enter a start date')
});

const useStyles = makeStyles(theme => ({
	label: {
		color: theme.palette.text.hint
	}
}));

const StartDate = () => {
	const { startDate, dueDate }: ITeamwork = useSelector(
		({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork
	);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			startDate
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields } = formState;
	const classes = useStyles();
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		reset({
			startDate
		});
	}, [formOpen, reset, startDate]);

	function handleFormOpen(ev: MouseEvent<any>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleFormClose() {
		setFormOpen(false);
	}

	function onSubmit(result: { startDate: string }) {
		// dispatch(renameList({ listId: list.id, listStartDate: startDate }));
		handleFormClose();
	}

	const [pickerOpen, setPickerOpen] = useState(false);

	return (
		<div className="sm:max-w-320 py-12">
			{formOpen ? (
				<form className="flex" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="startDate"
						control={control}
						render={({ field: { onChange, value } }) => (
							<DateTimePicker
								className="w-full sm:w-320"
								label="Start Date"
								placeholder="Give a start date.."
								inputVariant="outlined"
								format="yyyy/MM/dd hh:mm a"
								maxDate={dueDate}
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
											<IconButton type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
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
						Start Date
					</Typography>
					<div className="flex items-center">
						<Typography
							className="text-16 sm:text-18 font-medium cursor-pointer py-10"
							onClick={handleFormOpen}
						>
							{startDate}
						</Typography>
						<IconButton className="p-10" size="small" onClick={handleFormOpen}>
							<Icon>edit</Icon>
						</IconButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default StartDate;
