import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Icon, IconButton, makeStyles, TextareaAutosize, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ITeamwork from 'models/Teamwork';
import { MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RootStateOrAny, useSelector } from 'react-redux';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
	label: {
		color: theme.palette.text.hint
	},
	textArea: {
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: 5,
		outline: `none`,
		color: theme.palette.text.primary,
		background: 'none'
	},
	textAreaIcon: {
		position: 'absolute',
		top: '52.5%',
		right: 64
	}
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	description: yup.string().length(150, 'The description is too long')
});

const Description = () => {
	const { description }: ITeamwork = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			description
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields } = formState;
	const classes = useStyles();
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		reset({
			description
		});
	}, [formOpen, reset, description]);

	function handleFormOpen(ev: MouseEvent<any>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleFormClose() {
		setFormOpen(false);
	}

	function onSubmit(result: { description: string }) {
		// dispatch(renameList({ listId: list.id, listTitle: title }));
		handleFormClose();
	}

	return (
		<div className="w-full py-12">
			{formOpen ? (
				<form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<>
								<TextareaAutosize
									{...field}
									className={clsx(classes.textArea, 'w-full text-14 sm:text-16 p-12 pr-68')}
									aria-label="description"
									placeholder="Write something.."
									autoFocus
									rowsMin={5}
									onBlur={() =>
										setTimeout(() => {
											handleFormClose();
										}, 100)
									}
								/>
								<IconButton
									className={classes.textAreaIcon}
									type="submit"
									disabled={_.isEmpty(dirtyFields) || !isValid}
								>
									<Icon>check</Icon>
								</IconButton>
							</>
						)}
					/>
				</form>
			) : (
				<div>
					<Typography
						className={clsx(classes.label, 'text-12 sm:text-14 font-medium cursor-pointer leading-3')}
						onClick={handleFormOpen}
					>
						Description
					</Typography>
					<div className="flex items-center">
						<Typography
							className="text-16 sm:text-18 font-medium cursor-pointer py-10"
							onClick={handleFormOpen}
						>
							{description}
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

export default Description;
