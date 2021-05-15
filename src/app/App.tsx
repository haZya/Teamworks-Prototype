import DateFnsUtils from '@date-io/date-fns';
import '@fake-db';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import _ from '@lodash';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import { RootState } from './store';
import { navbarCloseFolded } from './store/fuse/navbarSlice';
import { setDefaultSettings } from './store/fuse/settingsSlice';

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point') || undefined
});

const generateClassName = createGenerateClassName({ disableGlobal: true });

const App = () => {
	const dispatch = useDispatch();
	const config = useSelector(({ fuse }: RootState) => fuse.settings.current.layout.config);

	useEffect(() => {
		if (config.navbar?.style !== 'style-2' && !config.navbar?.folded) {
			dispatch(setDefaultSettings(_.set({}, 'layout.config.navbar.folded', true)));
		} else {
			dispatch(navbarCloseFolded());
		}
	}, [config.navbar, dispatch]);

	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Auth>
						<Router history={history}>
							<FuseAuthorization>
								<FuseTheme>
									<SnackbarProvider
										maxSnack={5}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right'
										}}
										classes={{
											containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
										}}
									>
										<FuseLayout />
									</SnackbarProvider>
								</FuseTheme>
							</FuseAuthorization>
						</Router>
					</Auth>
				</MuiPickersUtilsProvider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

export default App;
