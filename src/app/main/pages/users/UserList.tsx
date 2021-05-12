// import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
// import { removeContact, selectContacts, toggleStarredContact } from './store/contactsSlice';

import DefaultComponents from 'app/shared-components/data-table/CustomComponents';
import DataTable from 'app/shared-components/data-table/DataTable';
import DefaultOptions from 'app/shared-components/data-table/DefaultOptions';
import FilterAutoComplete from 'app/shared-components/data-table/FilterAutoComplete';
import { MUIDataTableColumnDef } from 'mui-datatables/index';
import { useMemo } from 'react';

function UserList(props: any) {
	// const dispatch = useDispatch();
	// const contacts = useSelector(selectContacts);
	// const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	// const user = useSelector(({ contactsApp }) => contactsApp.user);

	// const [filteredData, setFilteredData] = useState(null);

	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			Header: ({ selectedFlatRows }: { selectedFlatRows: any }) => {
	// 				const selectedRowIds = selectedFlatRows.map((row: any) => row.original.id);

	// 				return selectedFlatRows.length > 0 && <div />;
	// 			},
	// 			accessor: 'avatar',
	// 			Cell: ({ row }: { row: any }) => {
	// 				return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
	// 			},
	// 			className: 'justify-center',
	// 			width: 64,
	// 			sortable: false
	// 		},
	// 		{
	// 			Header: 'First Name',
	// 			accessor: 'name',
	// 			className: 'font-medium',
	// 			sortable: true
	// 		},
	// 		{
	// 			Header: 'Last Name',
	// 			accessor: 'lastName',
	// 			className: 'font-medium',
	// 			sortable: true
	// 		},
	// 		{
	// 			Header: 'Company',
	// 			accessor: 'company',
	// 			sortable: true
	// 		},
	// 		{
	// 			Header: 'Job Title',
	// 			accessor: 'jobTitle',
	// 			sortable: true
	// 		},
	// 		{
	// 			Header: 'Email',
	// 			accessor: 'email',
	// 			sortable: true
	// 		},
	// 		{
	// 			Header: 'Phone',
	// 			accessor: 'phone',
	// 			sortable: true
	// 		},
	// 		{
	// 			id: 'action',
	// 			width: 128,
	// 			sortable: false,
	// 			Cell: ({ row }: { row: any }) => (
	// 				<div className="flex items-center">
	// 					<IconButton
	// 						onClick={ev => {
	// 							ev.stopPropagation();
	// 							// dispatch(toggleStarredContact(row.original.id));
	// 						}}
	// 					>
	// 						{/* {user.starred && user.starred.includes(row.original.id) ? (
	// 							<Icon className="text-yellow-700">star</Icon>
	// 						) : (
	// 							<Icon>star_border</Icon>
	// 						)}
	// 					</IconButton>
	// 					<IconButton
	// 						onClick={ev => {
	// 							ev.stopPropagation();
	// 							dispatch(removeContact(row.original.id));
	// 						}}
	// 					> */}
	// 						<Icon>delete</Icon>
	// 					</IconButton>
	// 				</div>
	// 			)
	// 		}
	// 	],
	// 	[dispatch]
	// );

	// useEffect(() => {
	// 	function getFilteredArray(entities, _searchText) {
	// 		if (_searchText.length === 0) {
	// 			return contacts;
	// 		}
	// 		return FuseUtils.filterArrayByString(contacts, _searchText);
	// 	}

	// 	if (contacts) {
	// 		setFilteredData(getFilteredArray(contacts, searchText));
	// 	}
	// }, [contacts, searchText]);

	// if (!filteredData) {
	// 	return null;
	// }

	// if (filteredData.length === 0) {
	// 	return (
	// 		<div className="flex flex-1 items-center justify-center h-full">
	// 			<Typography color="textSecondary" variant="h5">
	// 				There are no contacts!
	// 			</Typography>
	// 		</div>
	// 	);
	// }

	const data = useMemo(
		() => [
			{ id: 1, area: 'customFilterListOptionscustom sdf customFilterListOptions sdf sfsdfd' },
			{ id: 2, area: 't2' },
			{ id: 3, area: 't3' },
			{ id: 4, area: 'customFilterListOptionscustom sdf customFilterListOptions sdf sfsdd' }
		],
		[]
	);

	const columns: MUIDataTableColumnDef[] = useMemo(
		() => [
			{
				name: 'id',
				options: {
					display: false,
					searchable: false,
					download: false,
					print: false,
					viewColumns: false,
					filter: false
				}
			},
			{
				name: 'area',
				label: 'Area',
				options: {
					filterType: 'custom',
					filterList: [],
					customFilterListOptions: {
						render: (v: string[]) => `Area: ${v.join(', ')}`,
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
							const filterItems = [...Array.from(new Set(data.map(row => row.area)))];

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
				}
			}
			// {
			// 	name: 'Actions',
			// 	options: {
			// 		filter: false,
			// 		sort: false,
			// 		searchable: false,
			// 		download: false,
			// 		print: false,
			// 		empty: true,
			// 		customBodyRenderLite: dataIndex => {
			// 			return (
			// 				<div>
			// 					<CustomIconButton
			// 						size="small"
			// 						onClick={() => {
			// 							setDataIndex(dataIndex);
			// 							setOpen(true);
			// 						}}
			// 					>
			// 						<UpdateIcon />
			// 					</CustomIconButton>
			// 				</div>
			// 			);
			// 		}
			// 	}
			// }
		],
		[data]
	);

	return (
		<div>
			<DataTable
				title="Areas List"
				columns={columns}
				data={data}
				options={{
					...DefaultOptions({
						title: 'Areas List',
						rowCount: data.length
						//   onDelete: handleDeleteSelected,
					})
					// ...options,
				}}
				components={DefaultComponents}
			/>
			{/* <ContactsTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditContactDialog(row.original));
					}
				}}
			/> */}
		</div>
	);
}

export default UserList;
