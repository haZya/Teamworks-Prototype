import { MUIDataTableColumnOptions } from 'mui-datatables/index';
import FilterAutoComplete from './FilterAutoComplete';

const DefaultColumnOptions = (columnTitle: string, columnLabel: string, data: any[]): MUIDataTableColumnOptions => ({
	filterType: 'custom',
	filterList: [],
	customFilterListOptions: {
		render: (v: string[]) => `${columnLabel}: ${v.join(', ')}`,
		update: (filterList: any[], _: number, index: number) => {
			filterList[index].splice(0, filterList[index].length);
			return filterList;
		}
	},
	filterOptions: {
		logic: (prop, filterValue) => {
			if (filterValue.length) return !filterValue.includes(prop);
			return false;
		},
		display: (filterList, onChange, index, column) => {
			const filterItems = [...Array.from(new Set(data.map(row => row[columnTitle])))];

			return (
				<FilterAutoComplete
					title={column.label}
					itemCount={filterItems.length}
					filterOptions={filterItems}
					filterList={filterList}
					onChange={onChange}
					index={index}
					column={column}
				/>
			);
		},
		fullWidth: true
	}
});

export default DefaultColumnOptions;
