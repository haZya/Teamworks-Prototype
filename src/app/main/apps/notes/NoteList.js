import FuseUtils from '@fuse/utils';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NoteListItem from './NoteListItem';
import { selectNotes } from './store/notesSlice';

const useStyles = makeStyles(theme => ({
	column: {
		padding: 8,
		[theme.breakpoints.down(481)]: {
			padding: 0
		}
	}
}));

function NoteList(props) {
	const notes = useSelector(selectNotes);
	const variateDescSize = useSelector(({ notesApp }) => notesApp.notes.variateDescSize);
	const searchText = useSelector(({ notesApp }) => notesApp.notes.searchText);

	const classes = useStyles();
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		function filterData() {
			const { params } = props.match;
			const { folderHandle, id } = params;

			let data = notes;

			if (id) {
				data = data.filter(note => note.labels.includes(id) && !note.archive);
			}

			if (!folderHandle) {
				data = data.filter(note => !note.archive);
			}

			if (folderHandle === 'archive') {
				data = data.filter(note => note.archive);
			}

			if (folderHandle === 'reminders') {
				data = data.filter(note => Boolean(note.reminder) && !note.archive);
			}

			if (searchText.length === 0) {
				return data;
			}

			data = FuseUtils.filterArrayByString(data, searchText);

			return data;
		}

		if (notes.length > 0) {
			setFilteredData(filterData());
		}
	}, [notes, searchText, props.match]);

	return !filteredData || filteredData.length === 0 ? (
		<div className="flex items-center justify-center h-full">
			<Typography color="textSecondary" variant="h5">
				There are no notes!
			</Typography>
		</div>
	) : (
		<div className="flex flex-wrap w-full">
			<Masonry
				breakpointCols={{
					default: 5,
					1920: 4,
					1600: 3,
					1366: 2,
					1280: 4,
					960: 3,
					640: 2,
					480: 1
				}}
				className="my-masonry-grid flex w-full"
				columnClassName={clsx(classes.column, 'my-masonry-grid_column flex flex-col')}
			>
				{filteredData.map(note => (
					<NoteListItem
						key={note.id}
						note={note}
						className="w-full rounded-20 shadow mb-16"
						variateDescSize={variateDescSize}
					/>
				))}
			</Masonry>
		</div>
	);
}

export default withRouter(NoteList);
