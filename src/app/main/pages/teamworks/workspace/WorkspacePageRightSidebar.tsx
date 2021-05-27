import _ from '@lodash';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWidgets, selectWidgetsEntities } from '../store/widgetSlice';
import WidgetCampaigns from './widgets/WidgetCampaigns';
import WidgetNow from './widgets/WidgetNow';

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

function WorkspacePageRightSidebar() {
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgetsEntities);

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	if (_.isEmpty(widgets)) {
		return null;
	}

	return (
		<motion.div className="w-full py-10" variants={container} initial="hidden" animate="show">
			<motion.div variants={item} className="widget w-full px-20 py-10">
				<WidgetNow />
			</motion.div>
			<motion.div variants={item} className="widget w-full px-20 py-10">
				<WidgetCampaigns data={widgets.widget9} />
			</motion.div>
		</motion.div>
	);
}

export default WorkspacePageRightSidebar;
