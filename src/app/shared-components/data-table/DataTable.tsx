import { Grow, MuiThemeProvider, Theme } from '@material-ui/core';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import MUIDataTable from 'mui-datatables';
import { MUIDataTableColumnDef, MUIDataTableOptions, MUIDataTableProps } from 'mui-datatables/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { DefaultMuiTheme } from './Themes';

interface IProps {
	title: string;
	data: (object | string[] | number[])[];
	columns: MUIDataTableColumnDef[];
	options: MUIDataTableOptions;
	components: MUIDataTableProps['components'];
	theme?: Theme;
}

const DataTable: React.FC<IProps> = ({ title, columns, data, options, components, theme }) => {
	const mainTheme = useSelector(selectMainTheme);

	if (!theme) {
		theme = DefaultMuiTheme(mainTheme);
	}

	return (
		<MuiThemeProvider theme={theme}>
			<MUIDataTable
				title={
					<Grow in style={{ transformOrigin: '0 0 0' }} timeout={300}>
						<h3 style={{ fontSize: '20px' }}>
							{title} ({data.length} {data.length === 1 ? 'record' : 'records'})
						</h3>
					</Grow>
				}
				columns={columns}
				data={data}
				options={options}
				components={components}
			/>
		</MuiThemeProvider>
	);
};

export default DataTable;
