import { Icon, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';

function LeftSidebarHeader() {
	return (
		<div className="flex items-center sm:p-24 h-full -mt-20">
			<motion.span initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2 } }}>
				<Icon className="text-24 md:text-32">people_alt</Icon>
			</motion.span>
			<motion.span initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.2 } }}>
				<Typography className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold">Users</Typography>
			</motion.span>
		</div>
	);
}

export default LeftSidebarHeader;
