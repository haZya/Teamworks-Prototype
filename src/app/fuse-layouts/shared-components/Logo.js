import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	}
}));

function Logo() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<img className="logo-icon w-24 h-24" src="assets/images/logos/fuse.svg" alt="logo" />
			<Typography className="text-14 leading-none mx-12 font-medium logo-text" color="inherit">
				Teamworks Prototype
			</Typography>
		</div>
	);
}

export default Logo;
