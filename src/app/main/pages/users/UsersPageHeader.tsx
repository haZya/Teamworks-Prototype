import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import { MutableRefObject } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setUsersSearchText } from './store/usersSlice';

interface IProps {
	pageLayout: MutableRefObject<any>;
}

function UsersPageHeader({ pageLayout }: IProps) {
	const dispatch = useDispatch();
	const searchText: string = useSelector(({ usersPage }: RootStateOrAny) => usersPage.users.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 items-center justify-between p-4 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
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
						account_box
					</Icon>
					<motion.span initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.2 } }}>
						<Typography className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold">Users</Typography>
					</motion.span>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center px-8 sm:px-12">
				<ThemeProvider theme={mainTheme}>
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="w-full max-w-512"
					>
						<Paper className="flex p-4 items-center h-48 px-16 py-4 shadow">
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search for anything"
								className="flex flex-1 px-16"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(setUsersSearchText(ev.target.value || ''))}
							/>
						</Paper>
					</motion.div>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default UsersPageHeader;
