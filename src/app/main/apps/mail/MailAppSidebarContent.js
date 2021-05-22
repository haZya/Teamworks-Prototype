import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MailCompose from './MailCompose';
import { selectFilters } from './store/filtersSlice';
import { selectFolders } from './store/foldersSlice';
import { selectLabels } from './store/labelsSlice';

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: '100%',
		borderRadius: 6,
		paddingLeft: 12,
		paddingRight: 12,
		marginBottom: 4,
		'&.active': {
			backgroundColor:
				theme.palette.type === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		paddingLeft: 12
	}
}));

function MailAppSidebarContent(props) {
	const folders = useSelector(selectFolders);
	const filters = useSelector(selectFilters);
	const labels = useSelector(selectLabels);

	const classes = useStyles();
	const routeParams = useParams();
	const toPathFolder = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/email/:folderHandle');
	const toPathFilter = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/email/filter/:filterHandle');
	const toPathLabel = pathToRegexp.compile('/teamworks/:teamworkId/:teamworkHandle/email/label/:labelHandle');

	return (
		<motion.div
			initial={{ y: 50, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
			className="flex-auto border-l-1"
		>
			<MailCompose />

			<div className="px-12">
				<List>
					<ListSubheader className={classes.listSubheader} disableSticky>
						Folders
					</ListSubheader>

					{folders.length > 0 &&
						folders.map(folder => (
							<ListItem
								button
								component={NavLinkAdapter}
								to={toPathFolder({ ...routeParams, folderHandle: folder.handle })}
								key={folder.id}
								activeClassName="active"
								className={classes.listItem}
							>
								<Icon className="list-item-icon" color="action">
									{folder.icon}
								</Icon>
								<ListItemText primary={folder.title} disableTypography />
							</ListItem>
						))}
				</List>

				<List>
					<ListSubheader className={classes.listSubheader} disableSticky>
						Filters
					</ListSubheader>

					{filters.length > 0 &&
						filters.map(filter => (
							<ListItem
								button
								component={NavLinkAdapter}
								to={toPathFilter({ ...routeParams, filterHandle: filter.handle })}
								activeClassName="active"
								className={classes.listItem}
								key={filter.id}
							>
								<Icon className="list-item-icon" color="action">
									{filter.icon}
								</Icon>
								<ListItemText primary={filter.title} disableTypography />
							</ListItem>
						))}
				</List>

				<List>
					<ListSubheader className={classes.listSubheader} disableSticky>
						Labels
					</ListSubheader>

					{labels &&
						labels.map(label => (
							<ListItem
								button
								component={NavLinkAdapter}
								to={toPathLabel({ ...routeParams, labelHandle: label.handle })}
								key={label.id}
								className={classes.listItem}
							>
								<Icon className="list-item-icon" style={{ color: label.color }} color="action">
									label
								</Icon>
								<ListItemText primary={label.title} disableTypography />
							</ListItem>
						))}
				</List>
			</div>
		</motion.div>
	);
}

export default MailAppSidebarContent;
