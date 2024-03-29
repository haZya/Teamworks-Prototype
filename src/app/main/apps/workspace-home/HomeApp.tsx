import { darken, fade, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import HomeAppForm from './HomeAppForm';

const headerHeight = 200;

const useStyles = makeStyles(theme => ({
	'@global': {
		'#fuse-main': {
			height: '100vh'
		}
	},
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 1 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	topBg: {
		zIndex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: theme.palette.primary.dark,
		backgroundSize: 'cover',
		pointerEvents: 'none'
	},
	contentCardWrapper: {
		position: 'relative',
		padding: 24,
		maxWidth: 1400,
		display: 'flex',
		flexDirection: 'column',
		flex: '1 0 auto',
		width: '100%',
		minWidth: '0',
		maxHeight: '100%',
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			padding: 16
		},
		[theme.breakpoints.down('xs')]: {
			padding: 12
		},
		background: fade(theme.palette.background.paper, 0.6)
	},
	contentCard: {
		zIndex: 2,
		display: 'flex',
		position: 'relative',
		flex: '1 1 100%',
		flexDirection: 'row',
		// backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.background.paper
				: darken(theme.palette.background.paper, 0.1),
		minHeight: 0,
		overflow: 'auto'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		zIndex: 10,
		background: `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(
			theme.palette.background.paper,
			0.6
		)} 20%,${fade(theme.palette.background.paper, 0.8)})`
	},
	content: {
		display: 'flex',
		flex: '1 1 100%',
		minHeight: 0
	}
}));

const HomeApp = () => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root)}>
			<div className={classes.topBg} />

			<div className={clsx(classes.contentCardWrapper, 'container')}>
				<div className={clsx(classes.contentCard, 'shadow rounded-20')}>
					<main className={clsx(classes.contentWrapper, 'z-10')}>
						<div className={classes.content}>
							<div className="flex flex-1 overflow-x-auto overflow-y-hidden">
								<HomeAppForm />
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default HomeApp;
