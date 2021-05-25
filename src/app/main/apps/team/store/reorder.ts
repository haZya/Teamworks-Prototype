// a little function to help us with reordering the result
const reorder = (lists: any[], startIndex: number, endIndex: number) => {
	const result = Array.from(lists);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export default reorder;
