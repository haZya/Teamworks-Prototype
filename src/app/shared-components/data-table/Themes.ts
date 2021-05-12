import { createMuiTheme, Theme } from '@material-ui/core';

export const DefaultMuiTheme = (theme: Theme): Theme =>
	createMuiTheme({
		...theme,
		overrides: {
			MUIDataTable: {
				paper: {
					'@media screen and (max-width: 599px)': {
						borderRadius: 0
					},
					borderRadius: 16
				}
			},
			MUIDataTableToolbar: {
				icon: {
					'&:hover': {
						color: theme.palette.secondary.main
					}
				},
				iconActive: {
					color: theme.palette.secondary.main
				}
			},
			MUIDataTableToolbarSelect: {
				root: {
					boxShadow: 'none',
					borderRadius: 0
				}
			},
			MUIDataTableHeadCell: {
				toolButton: {
					fontWeight: 600,
					fontSize: '1.4rem',
					'&:hover': {
						color: theme.palette.secondary.main
					}
				},
				sortLabelRoot: {
					height: '24px'
				},
				sortActive: {
					color: theme.palette.secondary.main
				}
			},
			MUIDataTableFilter: {
				root: {
					maxWidth: '400px'
				},
				title: {
					marginLeft: '0px'
				},
				resetLink: {
					marginTop: -5,
					color: theme.palette.secondary.main
				}
			},
			MUIDataTableJumpToPage: {
				root: {
					'@media screen and (max-width: 761px)': {
						padding: 0
					}
				}
			},
			MUIDataTablePagination: {
				toolbar: {
					'@media screen and (max-width: 761px)': {
						marginTop: '-15px',
						padding: 0
					}
				},
				navContainer: {
					'@media screen and (max-width: 761px)': {
						display: 'grid'
					}
				}
			},
			MUIDataTableBodyCell: {
				root: {
					'@media screen and (max-width: 959px)': {
						width: '100% !important',
						fontSize: '1.3rem !important'
					}
				},
				simpleHeader: {
					display: 'inline-block',
					fontWeight: 600,
					width: '100%',
					boxSizing: 'border-box'
				},
				stackedHeader: {
					verticalAlign: 'top',
					fontWeight: 600,
					paddingRight: 30,
					'@media screen and (max-width: 959px)': {
						paddingRight: 0
					}
				}
			},
			MuiTableRow: {
				// footer: {
				// 	borderTop: '1px solid '
				// },
				root: {
					'&:last-child td': {
						borderTop: `1px solid`,
						borderColor: theme.palette.type === 'light' ? 'rgb(224, 224, 224)' : 'rgb(81, 81, 81)',
						borderBottom: 0
					}
				}
			}
		}
	});

export const VerticalMuiTheme = (theme: Theme): Theme =>
	createMuiTheme(
		{
			overrides: {
				MUIDataTableBodyCell: {
					simpleCell: {
						display: 'inline-block',
						width: '100%',
						boxSizing: 'border-box'
					},
					stackedCommon: {
						display: 'inline-block',
						fontSize: '16px',
						height: 'auto',
						width: 'calc(50%)',
						boxSizing: 'border-box',
						'&:last-child': {
							borderBottom: 'none'
						},
						'&:nth-last-child(2)': {
							borderBottom: 'none'
						}
					},
					stackedParent: {
						display: 'inline-block',
						fontSize: '16px',
						height: 'auto',
						width: 'calc(100%)',
						boxSizing: 'border-box'
					}
				},
				MUIDataTableBodyRow: {
					responsiveStacked: {
						borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
						borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
						padding: 0,
						margin: 0
					}
				},
				MUIDataTableHead: {
					main: {
						display: 'none'
					}
				},
				MUIDataTableFooter: {
					root: {
						display: 'none !important'
					}
				}
			}
		},
		DefaultMuiTheme(theme)
	);
