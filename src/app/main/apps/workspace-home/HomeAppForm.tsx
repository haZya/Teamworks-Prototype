import Category from './controls/Category';
import Description from './controls/Description';
import DueDate from './controls/DueDate';
import Priority from './controls/Priority';
import StartDate from './controls/StartDate';
import Title from './controls/Title';

const HomeAppForm = () => {
	return (
		<div className="flex items-center w-full px-20 sm:px-36 md:px-48 py-36 overflow-auto">
			<div className="w-full h-full">
				<Title />
				<Description />
				<Category />
				<Priority />
				<StartDate />
				<DueDate />
			</div>
		</div>
	);
};

export default HomeAppForm;
