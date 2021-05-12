import { MUIDataTableOptions } from 'mui-datatables/index';
import CustomSearchRender from './CustomSerach';
import CustomToolbarSelect from './CustomToolbarSelect';

interface IProps {
	title: string;
	rowCount?: number;
	expandable?: boolean;
	onDelete?: (deletedRowIds: any[]) => void;
}
const rowsPerPage = [5, 10, 15];

const DefaultOptions = ({ title, rowCount, expandable, onDelete }: IProps): MUIDataTableOptions => ({
	customSearchRender: (searchText, handleSearch, hideSearch, options) => {
		return (
			<CustomSearchRender
				searchText={searchText}
				handleSearch={handleSearch}
				hideSearch={hideSearch}
				options={options}
				rowCount={rowCount}
			/>
		);
	},
	downloadOptions: {
		filename: `${title}.csv`
	},
	filter: true,
	filterType: 'textField',
	sort: true,
	print: true,
	download: true,
	draggableColumns: {
		enabled: true
	},
	enableNestedDataAccess: '.',
	rowsPerPage: rowsPerPage[1],
	rowsPerPageOptions: rowsPerPage,
	fixedSelectColumn: false,
	setTableProps: () => {
		return {
			padding: 'default',
			size: 'small'
		};
	},
	expandableRowsHeader: false,
	expandableRowsOnClick: expandable,
	selectableRowsOnClick: !expandable,
	jumpToPage: true,
	customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
		return (
			<CustomToolbarSelect
				selectedRows={selectedRows}
				displayData={displayData}
				setSelectedRows={setSelectedRows}
				onDelete={onDelete}
			/>
		);
	}
});

export default DefaultOptions;
