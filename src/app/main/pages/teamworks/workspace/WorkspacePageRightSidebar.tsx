import { motion } from 'framer-motion';
import WidgetNow from './widgets/WidgetNow';

function WorkspacePageRightSidebar() {
	const container = {
		hidden: { opacity: 1 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div className="w-full" variants={container} initial="hidden" animate="show">
			<motion.div variants={item} className="widget flex w-full px-20">
				<WidgetNow />
			</motion.div>
		</motion.div>
	);
}

export default WorkspacePageRightSidebar;
