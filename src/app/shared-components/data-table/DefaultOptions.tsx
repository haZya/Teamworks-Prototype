import { openEditUserDialog } from 'app/main/pages/users/store/usersSlice';
import { MUIDataTableOptions } from 'mui-datatables/index';
import { useDispatch } from 'react-redux';
import CustomSearchRender from './CustomSerach';
import CustomToolbarSelect from './CustomToolbarSelect';

interface IProps {
	title: string;
	rowCount?: number;
	data?: any[];
	tableBodyHeight?: string | number | undefined;
	minHeightThreshold?: number;
	onDelete?: (deletedRowIds: string[] | number[]) => void;
}
const rowsPerPage = [5, 15, 30];

const DefaultOptions = ({
	title,
	rowCount,
	data,
	tableBodyHeight,
	minHeightThreshold,
	onDelete
}: IProps): MUIDataTableOptions => {
	const dispatch = useDispatch();

	return {
		elevation: 1,
		tableBodyHeight:
			tableBodyHeight && minHeightThreshold && tableBodyHeight > minHeightThreshold
				? `${tableBodyHeight}px`
				: undefined,
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
		expandableRowsOnClick: true,
		onRowClick: (
			_rowData: any[],
			rowMeta: {
				dataIndex: number;
				rowIndex: number;
			}
		) => dispatch(openEditUserDialog(data && data[rowMeta.dataIndex])),
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
	};
};

export default DefaultOptions;
