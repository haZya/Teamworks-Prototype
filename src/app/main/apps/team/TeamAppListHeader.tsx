import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Tooltip } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ITeamList from 'models/Team';
import { MouseEvent, useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { renameList } from './store/teamSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a title')
});

interface IProps {
	list: ITeamList;
	handleProps: DraggableProvidedDragHandleProps | undefined;
}

function TeamAppListHeader({ list, handleProps }: IProps) {
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
	const [formOpen, setFormOpen] = useState(false);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: list.name
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields } = formState;

	useEffect(() => {
		if (!formOpen) {
			reset({
				title: list.name
			});
		}
	}, [formOpen, reset, list.name]);

	useEffect(() => {
		if (formOpen && anchorEl) {
			setAnchorEl(null);
		}
	}, [anchorEl, formOpen]);

	function handleMenuClick(event: MouseEvent<any>) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleOpenForm(ev: MouseEvent<any>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleCloseForm() {
		setFormOpen(false);
	}

	function onSubmit({ title }: { title: string }) {
		dispatch(renameList({ listId: list.id, listTitle: title }));
		handleCloseForm();
	}

	return (
		<div {...handleProps}>
			<div className="flex items-center justify-between h-48 sm:h-64 px-8">
				<div className="flex items-center min-w-0 px-12">
					{formOpen ? (
						<ClickAwayListener onClickAway={handleCloseForm}>
							<form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
								<Controller
									name="title"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											variant="outlined"
											margin="none"
											autoFocus
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															type="submit"
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
						</ClickAwayListener>
					) : (
						<Typography className="text-16 font-medium cursor-pointer" onClick={handleOpenForm}>
							{list.name}
						</Typography>
					)}
				</div>
				<>
					<Tooltip title="Options">
						<IconButton
							aria-owns={anchorEl ? 'actions-menu' : undefined}
							aria-haspopup="true"
							onClick={handleMenuClick}
						>
							<Icon className="text-20">more_vert</Icon>
						</IconButton>
					</Tooltip>
					<Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
						<MenuItem onClick={handleOpenForm}>
							<ListItemIcon className="min-w-40">
								<Icon>edit</Icon>
							</ListItemIcon>
							<ListItemText primary="Rename List" />
						</MenuItem>
					</Menu>
				</>
			</div>
		</div>
	);
}

export default TeamAppListHeader;
