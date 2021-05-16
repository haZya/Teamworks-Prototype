import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { Avatar, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import themesConfig from 'app/fuse-configs/themesConfig';
import DefaultComponents from 'app/shared-components/data-table/CustomComponents';
import DataTable from 'app/shared-components/data-table/DataTable';
import DefaultColumnOptions from 'app/shared-components/data-table/DefaultColumnOptions';
import DefaultOptions from 'app/shared-components/data-table/DefaultOptions';
import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { removeUsers, selectUsers } from './store/usersSlice';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(0)
		}
	},
	avatar: {
		width: theme.spacing(4.47),
		height: theme.spacing(4.47)
	}
}));

interface IProps {
	container: MutableRefObject<any>;
}

function UserList({ container }: IProps) {
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const searchText: string = useSelector(({ usersPage }: RootStateOrAny) => usersPage.users.searchText);
	const currentUserr = useSelector(({ usersPage }: RootStateOrAny) => usersPage.currentUser);
	const [filteredData, setFilteredData] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		function getFilteredArray(entities: any[], _searchText: string) {
			if (_searchText.length === 0) {
				return entities;
			}
			return FuseUtils.filterArrayByString(entities, _searchText);
		}

		if (users) {
			setFilteredData(getFilteredArray(users, searchText));
		}
	}, [users, searchText]);

	const columns = useMemo(
		() => [
			{
				name: 'id',
				options: {
					display: false,
					searchable: false,
					download: false,
					print: false,
					viewColumns: false,
					sort: false,
					filter: false
				}
			},
			{
				name: 'avatar',
				label: 'Avatar',
				options: {
					searchable: false,
					sort: false,
					filter: false,
					customBodyRender: (value, tableMeta, updateValue) => {
						return (
							<div className={classes.root}>
								<Avatar
									className={classes.avatar}
									alt={tableMeta.rowData[2]?.toUpperCase()}
									src={value}
									style={{ backgroundColor: _.sample(themesConfig)?.palette.secondary.main }}
								/>
							</div>
						);
					}
				}
			},
			{
				name: 'name',
				label: 'First Name',
				options: DefaultColumnOptions('name', 'First Name', filteredData)
			},
			{
				name: 'lastName',
				label: 'Last Name',
				options: DefaultColumnOptions('lastName', 'Last Name', filteredData)
			},
			{
				name: 'company',
				label: 'Company',
				options: DefaultColumnOptions('company', 'Company', filteredData)
			},
			{
				name: 'jobTitle',
				label: 'Job Title',
				options: DefaultColumnOptions('jobTitle', 'Job Title', filteredData)
			},
			{
				name: 'email',
				label: 'Email',
				options: DefaultColumnOptions('email', 'Email', filteredData)
			},
			{
				name: 'phone',
				label: 'Phone',
				options: DefaultColumnOptions('phone', 'Phone', filteredData)
			}
		],
		[filteredData, classes]
	);

	const handleDeleteSelected = (toDelete: string[] | number[]) => {
		dispatch(removeUsers(toDelete));
	};

	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
	let heightOffset = 120;

	heightOffset = xsDown ? 172 : smDown ? 154 : 120;

	const [height, setHeight] = useState(0);

	useEffect(() => {
		setHeight(container.current.contentRef.current.clientHeight - heightOffset);

		const resizeListener = () => {
			setHeight(container.current.contentRef.current.clientHeight - heightOffset);
		};

		// set resize listener
		window.addEventListener('resize', resizeListener);

		// clean up function
		return () => {
			// remove resize listener
			window.removeEventListener('resize', resizeListener);
		};
	}, [container, heightOffset]);

	return (
		<DataTable
			title="Users List"
			columns={columns}
			data={filteredData}
			options={{
				...DefaultOptions({
					title: 'Users List',
					rowCount: filteredData.length,
					data: filteredData,
					tableBodyHeight: height,
					onDelete: handleDeleteSelected
				})
				// ...options,
			}}
			components={DefaultComponents}
		/>
	);
}

export default UserList;
