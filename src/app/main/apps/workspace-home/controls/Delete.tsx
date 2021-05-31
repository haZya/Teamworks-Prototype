import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Icon,
	IconButton
} from '@material-ui/core';
import { removeTeamwork } from 'app/main/pages/teamworks/store/teamworkSlice';
import { motion } from 'framer-motion';
import ITeamwork from 'models/Teamwork';
import { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { item } from '../anim';

const Delete = () => {
	const dispatch = useDispatch();
	const { id, title }: ITeamwork = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamwork);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleDelete() {
		dispatch(removeTeamwork(id));
		handleClose();
	}

	return (
		<motion.div variants={item} className="flex justify-end">
			<IconButton className="hover:text-red-500" onClick={handleClickOpen}>
				<Icon>delete</Icon>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Delete Teamwork?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete teamwork "{title}"?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button className="text-red-500" onClick={handleDelete}>
						Delete
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</motion.div>
	);
};

export default Delete;
