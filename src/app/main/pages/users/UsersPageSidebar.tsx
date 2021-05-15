import { Avatar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { openNewUserDialog } from './store/usersSlice';

const useStyles = makeStyles(theme => ({
	navLink: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		'& [role=button]': {
			textDecoration: 'none!important',
			height: 40,
			width: '100%',
			borderRadius: 6,
			paddingLeft: 12,
			paddingRight: 12,
			marginBottom: 4,
			'& .list-item-icon': {
				fontSize: 16,
				width: 16,
				height: 16,
				marginRight: 16
			}
		},
		'&.active': {
			cursor: 'default!important',
			pointerEvents: 'none!important',
			'& [role=button]': {
				backgroundColor:
					theme.palette.type === 'light'
						? 'rgba(0, 0, 0, .05)!important'
						: 'rgba(255, 255, 255, .1)!important',
				'& .list-item-icon': {
					color: 'inherit'
				}
			}
		}
	},
	listItem: {
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
	}
}));

function UsersPageSidebar() {
	const dispatch = useDispatch();
	const currentUser = useSelector(({ usersPage }: RootStateOrAny) => usersPage.currentUser);
	const classes = useStyles();

	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
				<Paper className="rounded-0 shadow-none lg:rounded-16 lg:shadow">
					<div className="p-24 flex items-center">
						<Avatar alt={currentUser.name} src={currentUser.avatar} />
						<Typography className="mx-12">{currentUser.name}</Typography>
					</div>

					<Divider />

					<div className="p-24">
						<Button
							variant="contained"
							color="secondary"
							className="w-full"
							onClick={ev => dispatch(openNewUserDialog())}
						>
							New User
						</Button>
					</div>

					<List className="pt-0 px-12">
						<NavLink to="/users/all" activeClassName="active" className={classes.navLink}>
							<ListItem button>
								<Icon className="list-item-icon text-16" color="action">
									people
								</Icon>
								<ListItemText className="truncate" primary="All users" disableTypography />
							</ListItem>
						</NavLink>
						<NavLink to="/users/frequent" activeClassName="active" className={classes.navLink}>
							<ListItem button>
								<Icon className="list-item-icon text-16" color="action">
									restore
								</Icon>
								<ListItemText className="truncate" primary="Frequently contacted" disableTypography />
							</ListItem>
						</NavLink>
						<NavLink to="/users/starred" activeClassName="active" className={classes.navLink}>
							<ListItem button>
								<Icon className="list-item-icon text-16" color="action">
									star
								</Icon>
								<ListItemText className="truncate" primary="Starred contacts" disableTypography />
							</ListItem>
						</NavLink>
					</List>
				</Paper>
			</motion.div>
		</div>
	);
}

export default UsersPageSidebar;
