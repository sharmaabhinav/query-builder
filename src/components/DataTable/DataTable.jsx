import {DataGrid} from '@mui/x-data-grid'
import Box from '@mui/material/Box';

const DataTable = ({data}) => {
  const columns = data.length ? Object.keys(data[0]).map((fieldName) => {
    return {
      field: fieldName,
      headerName: fieldName,
      width: 350,
    }
  }) : []

  const rows = data.map((row, index) => {
    return {
      ...row,
      id: index
    }
  })

  return (
    <Box
      sx={{height: 400, width: '100%'}}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
      />
    </Box>
  )
}

export default DataTable
