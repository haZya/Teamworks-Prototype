import _ from '@lodash';
import {
	Avatar,
	Hidden,
	Icon,
	IconButton,
	Input,
	makeStyles,
	Paper,
	ThemeProvider,
	Typography
} from '@material-ui/core';
import themesConfig from 'app/fuse-configs/themesConfig';
import { RootState } from 'app/store';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MutableRefObject } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setTeamworksSearchText } from './store/teamworksSlice';

const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: _.sample(themesConfig)?.palette.secondary.main
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		pointerEvents: 'none',
		fontSize: '80vw',
		width: '80vw',
		height: '80vw',
		[theme.breakpoints.up('sm')]: {
			fontSize: 444,
			width: 444,
			height: 244
		}
	}
}));

interface IProps {
	pageLayout: MutableRefObject<any>;
}

const TeamworksPageHeader = ({ pageLayout }: IProps) => {
	const dispatch = useDispatch();
	const searchText: string = useSelector(({ teamworksPage }: RootStateOrAny) => teamworksPage.teamworks.searchText);
	const user = useSelector(({ auth }: RootState) => auth.user);

	const mainTheme = useSelector(selectMainTheme);
	const classes = useStyles();

	return (
		// lg:ml-288 for header content inner
		<div className="lg:ml-28 pt-12 sm:py-32 sm:my-1 sm:px-28 lg:px-0 w-full">
			<div className="flex flex-1 items-center justify-between sm:ml-0 ">
				<div className="flex flex-shrink items-center sm:w-224 sm:-ml-12 lg:-ml-6">
					<Hidden lgUp>
						<IconButton
							onClick={ev => {
								pageLayout.current.toggleLeftSidebar();
							}}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>

					<div className="flex items-center">
						<Icon
							component={motion.span}
							initial={{ scale: 0 }}
							animate={{ scale: 1, transition: { delay: 0.2 } }}
							className="text-24 md:text-32"
						>
							group_work
						</Icon>
						<motion.span initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.2 } }}>
							<Typography className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold">
								Teamworks
							</Typography>
						</motion.span>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-center px-8 sm:px-4 ml-4 sm:ml-10">
					<ThemeProvider theme={mainTheme}>
						<motion.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
							className="w-full max-w-512"
						>
							<Paper className="flex p-4 items-center h-48 px-16 py-4 shadow">
								<Icon color="action">search</Icon>

								<Input
									placeholder="Search for a teamwork"
									className="flex flex-1 px-16"
									disableUnderline
									fullWidth
									value={searchText}
									inputProps={{
										'aria-label': 'Search'
									}}
									onChange={ev => dispatch(setTeamworksSearchText(ev.target.value || ''))}
								/>
							</Paper>
						</motion.div>
					</ThemeProvider>
				</div>
			</div>

			<Hidden xsDown>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
					<div className="flex items-center min-w-0 pt-20 lg:-ml-4">
						<Avatar
							className={clsx(classes.avatar, 'w-44 h-44 sm:w-54 sm:h-54 text-24 text-white')}
							alt={user.data.displayName}
							src={user.data.photoURL}
						/>

						<div className="mx-12 min-w-0">
							<Typography className="text-12 sm:text-14 md:text-18 font-bold leading-none mb-8 tracking-tight truncate">
								Welcome back, {user.data.displayName}!
							</Typography>

							<div className="flex items-center opacity-60">
								<Icon className="text-12 sm:text-20">notifications</Icon>
								<Typography className="text-10 sm:text-12 font-medium mx-4 truncate">
									You have 2 new messages and 15 new tasks
								</Typography>
							</div>
						</div>
					</div>
				</motion.div>
			</Hidden>
			<Icon className={classes.headerIcon}>group_work</Icon>
		</div>
	);
};

export default TeamworksPageHeader;
