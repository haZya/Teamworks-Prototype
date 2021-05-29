import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Icon, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { updateTeamworkTitle } from 'app/main/pages/teamworks/store/teamworkSlice';
import clsx from 'clsx';
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
	title: yup.string().required('You must enter a title')
});

const useStyles = makeStyles(theme => ({
	label: {
		color: theme.palette.text.hint
	}
}));

const Title = () => {
	const dispatch = useDispatch();
	const { title }: ITeamwork = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			title
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields } = formState;
	const classes = useStyles();
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		reset({
			title
		});
	}, [formOpen, reset, title]);

	function handleFormOpen(ev: MouseEvent<any>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleFormClose() {
		setFormOpen(false);
	}

	function onSubmit(result: { title: string }) {
		dispatch(updateTeamworkTitle(result.title));
		handleFormClose();
	}

	return (
		<motion.div variants={item} className="w-full py-12">
			{formOpen ? (
				<form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Title"
								placeholder="Give a title.."
								variant="outlined"
								margin="none"
								autoFocus
								fullWidth
								onBlur={handleFormClose}
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
						Title
					</Typography>
					<div className="flex items-center">
						<Typography
							className="text-16 sm:text-18 font-medium cursor-pointer py-10"
							onClick={handleFormOpen}
						>
							{title}
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

export default Title;
