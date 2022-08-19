import React from 'react'
import DataTable from 'react-data-table-component';
const paginationComponentOptions = {
  rowsPerPageText: 'Number of lines per page',
  rangeSeparatorText: '/',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'All',
};
function CustomDataTable({ columns, data }) {

  return (
    <DataTable highlightOnHover columns={columns} data={data} pagination paginationComponentOptions={paginationComponentOptions} />
  )
}

export default CustomDataTable