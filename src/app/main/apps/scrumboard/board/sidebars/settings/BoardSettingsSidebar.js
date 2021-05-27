import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeBoardSettings, copyBoard, deleteBoard } from '../../../store/boardSlice';

const pathToRegexp = require('path-to-regexp');

function BoardSettingsSidebar(props) {
	const dispatch = useDispatch();
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);

	const toPath = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/tasks');

	const routeParams = useParams();
	const matchParams = { ...routeParams };
	delete matchParams.boardUri;
	delete matchParams.boardId;
	const boardUrl = toPath(matchParams);

	return (
		<div>
			<AppBar position="static">
				<Toolbar className="flex w-full justify-center">Settings</Toolbar>
			</AppBar>

			<List className="py-16" dense>
				<ListItem
					button
					onClick={() => dispatch(changeBoardSettings({ cardCoverImages: !board.settings.cardCoverImages }))}
				>
					<ListItemIcon className="min-w-40">
						<Icon>photo</Icon>
					</ListItemIcon>
					<ListItemText primary="Card Cover Images" />
					<ListItemSecondaryAction>
						<Switch
							onChange={() =>
								dispatch(changeBoardSettings({ cardCoverImages: !board.settings.cardCoverImages }))
							}
							checked={board.settings.cardCoverImages}
						/>
					</ListItemSecondaryAction>
				</ListItem>

				<ListItem
					button
					onClick={() => dispatch(changeBoardSettings({ subscribed: !board.settings.subscribed }))}
				>
					<ListItemIcon className="min-w-40">
						<Icon>remove_red_eye</Icon>
					</ListItemIcon>
					<ListItemText primary="Subscribe" />
					<ListItemSecondaryAction>
						<Switch
							onChange={() => dispatch(changeBoardSettings({ subscribed: !board.settings.subscribed }))}
							checked={board.settings.subscribed}
						/>
					</ListItemSecondaryAction>
				</ListItem>

				<ListItem button onClick={() => dispatch(copyBoard({ board, boardUrl }))}>
					<ListItemIcon className="min-w-40">
						<Icon>file_copy</Icon>
					</ListItemIcon>
					<ListItemText primary="Copy Board" />
				</ListItem>

				<ListItem button onClick={() => dispatch(deleteBoard({ boardId: board.id, boardUrl }))}>
					<ListItemIcon className="min-w-40">
						<Icon>delete</Icon>
					</ListItemIcon>
					<ListItemText primary="Delete Board" />
				</ListItem>
			</List>
		</div>
	);
}

export default BoardSettingsSidebar;
