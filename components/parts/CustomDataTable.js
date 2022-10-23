import React from 'react'
import DataTable from 'react-data-table-component';
import Empty from './Empty';
const paginationComponentOptions = {
  rowsPerPageText: 'Number of lines per page',
  rangeSeparatorText: '/',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'All',
};
function CustomDataTable({ columns, data }) {
  return (
    data.length > 0
      ? <DataTable highlightOnHover columns={columns} data={data} pagination paginationComponentOptions={paginationComponentOptions} />
      : <Empty />
  )
}

export default CustomDataTable