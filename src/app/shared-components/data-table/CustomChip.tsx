import { Chip, Typography } from '@material-ui/core';
import React from 'react';

interface IProps {
	label: React.ReactNode;
	onDelete: (() => void) | undefined;
}

const CustomChip: React.FC<IProps> = ({ label, onDelete }) => {
	return (
		<Chip
			variant="outlined"
			color="secondary"
			style={{
				margin: '10px 0 10px 10px',
				padding: '2px 0 2px 0',
				height: '100%'
			}}
			label={
				<Typography
					style={{
						whiteSpace: 'normal',
						wordBreak: 'break-word'
					}}
				>
					{label}
				</Typography>
			}
			onDelete={onDelete}
		/>
	);
};

export default CustomChip;
