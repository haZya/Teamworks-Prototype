import { Checkbox, CheckboxProps, Tooltip, TooltipProps, withStyles, Zoom } from '@material-ui/core';
import { TableFilterList } from 'mui-datatables';
import { MUIDataTableProps } from 'mui-datatables/index';
import CustomChip from './CustomChip';

export const CustomFilterList = (props: any) => {
	return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

export const CustomTooltip = (props: TooltipProps) => {
	return (
		<Tooltip title={props.title} TransitionComponent={Zoom}>
			{props.children}
		</Tooltip>
	);
};

const StyledCheckbox = withStyles(theme => ({
	root: {
		'&$checked': {
			color: theme.palette.secondary.main
		}
	},
	checked: {}
}))(Checkbox);

export const CustomCheckbox = (props: CheckboxProps) => {
	const { classes, ...otherProps } = props;

	return <StyledCheckbox classes={{ root: classes?.root, checked: classes?.checked }} {...otherProps} />;
};

// For the components with no types
interface IComponents {
	Checkbox?: React.ReactNode;
}

const DefaultComponents: MUIDataTableProps['components'] & IComponents = {
	TableFilterList: CustomFilterList,
	Tooltip: CustomTooltip,
	Checkbox: CustomCheckbox
};

export default DefaultComponents;
