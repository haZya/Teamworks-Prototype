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
import { getCategories, selectCategories } from 'app/main/pages/teamworks/store/categoriesSlice';
import clsx from 'clsx';
import ITeamwork from 'models/Teamwork';
import { MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	category: yup.string().required('You must select a category')
});

const useStyles = makeStyles(theme => ({
	label: {
		color: theme.palette.text.hint
	}
}));

const Category = () => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const { category }: ITeamwork = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork);

	useDeepCompareEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	const { control, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			category
		},
		resolver: yupResolver(schema)
	});

	const classes = useStyles();
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		reset({
			category
		});
	}, [formOpen, reset, category]);

	function handleFormOpen(ev: MouseEvent<any>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleFormClose() {
		setFormOpen(false);
	}

	function onSubmit(result: { category: string }) {
		// dispatch(renameList({ listId: list.id, listTitle: title }));
		console.log(result.category);

		handleFormClose();
	}

	return (
		<div className="w-full py-12">
			{formOpen ? (
				<Controller
					name="category"
					control={control}
					render={({ field }) => (
						<FormControl className="flex w-full sm:w-320" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
							<Select
								{...field}
								label="Category"
								placeholder="Select a category.."
								autoFocus
								onChange={handleSubmit(onSubmit)}
								onBlur={handleFormClose}
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
								{categories.map(c => (
									<MenuItem key={c.id} value={c.value}>
										{c.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				/>
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
							{category}
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

export default Category;
