import { Grow, IconButton, TextField, withStyles } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React, { useEffect } from 'react';

const StyledIconButton = withStyles(theme => ({
	root: {
		marginTop: '-8px',
		'&:hover': {
			color: theme.palette.secondary.main
		}
	}
}))(IconButton);

interface IProps {
	searchText: string;
	handleSearch: any;
	hideSearch: any;
	options: any;
	rowCount?: number;
}

const CustomSearchRender: React.FC<IProps> = ({ searchText, handleSearch, hideSearch, options, rowCount }) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				hideSearch();
			}
		};

		// subscribe event
		document.addEventListener('keydown', handleKeyDown, false);

		return () => {
			// unsubscribe event
			document.removeEventListener('keydown', handleKeyDown, false);
		};
	}, [hideSearch]);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleSearch(e.target.value);
	};

	return (
		<Grow in style={{ transformOrigin: '0 0 0' }} timeout={300}>
			<>
				<TextField
					autoFocus
					placeholder={`Search ${rowCount} ${rowCount === 1 ? 'row...' : 'rows...'}`}
					InputProps={{
						'aria-label': options.textLabels.toolbar.search
					}}
					value={searchText || ''}
					onChange={handleTextChange}
					fullWidth={false}
					color="secondary"
				/>
				<StyledIconButton onClick={hideSearch}>
					<Clear />
				</StyledIconButton>
			</>
		</Grow>
	);
};

export default CustomSearchRender;
