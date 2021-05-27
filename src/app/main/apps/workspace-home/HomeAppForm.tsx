import Category from './controls/Category';
import Description from './controls/Description';
import Title from './controls/Title';

const HomeAppForm = () => {
	return (
		<div className="flex items-center w-full px-20 sm:px-36 md:px-48 py-36 overflow-auto">
			<div className="w-full h-full">
				<Title />
				<Description />
				<Category />
			</div>
		</div>
	);
};

export default HomeAppForm;
