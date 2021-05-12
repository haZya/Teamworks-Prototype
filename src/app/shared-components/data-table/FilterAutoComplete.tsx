import { Checkbox, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { MUIDataTableColumn } from 'mui-datatables/index';
import React from 'react';

interface IProps {
	title: string | undefined;
	itemCount: number;
	filterOptions: any[];
	filterList: string[][];
	onChange: (val: string | string[], index: number, column: MUIDataTableColumn) => void;
	index: number;
	column: MUIDataTableColumn;
}

const FilterAutoComplete: React.FC<IProps> = ({
	title,
	itemCount,
	filterOptions,
	filterList,
	onChange,
	index,
	column
}) => {
	return (
		<Autocomplete
			multiple
			limitTags={1}
			value={filterList[index]}
			onChange={(_, values) => {
				filterList[index] = values;
				onChange(filterList[index], index, column);
			}}
			options={filterOptions}
			disableCloseOnSelect
			getOptionLabel={option => option}
			renderOption={(option, { selected }) => (
				<>
					<Checkbox checked={selected} />
					{option}
				</>
			)}
			style={{ width: 'auto', minWidth: 200 }}
			renderInput={params => (
				<TextField
					{...params}
					variant="standard"
					color="secondary"
					label={title}
					placeholder={`From ${itemCount} ${itemCount === 1 ? 'option...' : 'options...'}`}
				/>
			)}
		/>
	);
};

export default FilterAutoComplete;
