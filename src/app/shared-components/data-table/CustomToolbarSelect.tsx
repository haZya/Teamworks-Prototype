import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import React from 'react';
import { CustomTooltip } from './CustomComponents';

const StyledIconButton = withStyles(theme => ({
	root: {
		'&:hover': {
			color: theme.palette.secondary.main
		}
	}
}))(IconButton);

interface IProps {
	selectedRows: {
		data: {
			index: number;
			dataIndex: number;
		}[];
		lookup: {
			[key: number]: boolean;
		};
	};
	displayData: {
		data: any[];
		dataIndex: number;
	}[];
	setSelectedRows: (rows: number[]) => void;
	onDelete?: (deletedRowIds: string[] | number[]) => void;
}

const CustomToolbarSelect: React.FC<IProps> = ({ selectedRows, displayData, setSelectedRows, onDelete }) => {
	const handleClickInverseSelection = () => {
		const nextSelectedRows = displayData.reduce((previousValue: number[], _, index) => {
			if (!selectedRows.data.find(selectedRow => selectedRow.index === index)) {
				previousValue.push(index);
			}

			return previousValue;
		}, []);

		setSelectedRows(nextSelectedRows);
	};

	const handleClickDeselectAll = () => {
		setSelectedRows([]);
	};

	const handleClickDeleteSelected = () => {
		if (onDelete) {
			const toDelete = displayData
				.filter(data => selectedRows.data.map(row => row.dataIndex).includes(data.dataIndex))
				.map(d => d.data[0]);
			onDelete(toDelete);
			setSelectedRows([]);
		}
	};

	return (
		<div style={{ marginRight: '24px' }}>
			<CustomTooltip title="Deselect All">
				<StyledIconButton onClick={handleClickDeselectAll}>
					<IndeterminateCheckBoxIcon />
				</StyledIconButton>
			</CustomTooltip>
			<CustomTooltip title="Inverse Selection">
				<StyledIconButton onClick={handleClickInverseSelection}>
					<CompareArrowsIcon style={{ transform: 'rotate(90deg)' }} />
				</StyledIconButton>
			</CustomTooltip>
			<CustomTooltip title="Delete Selected">
				<StyledIconButton onClick={handleClickDeleteSelected}>
					<Delete />
				</StyledIconButton>
			</CustomTooltip>
		</div>
	);
};

export default CustomToolbarSelect;
