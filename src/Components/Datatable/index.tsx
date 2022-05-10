import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateSelectedItems, selectTableData, openDialog, closeDialog, updateEditData } from '../../store/slices/tableSlice';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';




export default function DataTable() {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector(selectTableData);

  
const onEditClickHandler = (params: any) => {
  dispatch(updateEditData({
    id: params.row.id,
    name: params.row.name,
    age: params.row.age,
  }))
  dispatch(openDialog({}))
  
}

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => <IconButton onClick={() => onEditClickHandler(params)}><ModeEditIcon /></IconButton>,
      // disableClickEventBubbling: true,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.id}
        onSelectionModelChange={(selectedItems) => {
          // setSelectedItems(selectedItems);
          dispatch(updateSelectedItems({
            selectedItems
          }))
        }}
      />
    </div>
  );
}