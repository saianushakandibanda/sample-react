import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridRowModes,
  GridPagination,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId,
  randomTraderName,
  randomCreatedDate,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => randomArrayItem(roles);

const initialRows = [
  { id: randomId(), name: randomTraderName(), age: 25, joinDate: randomCreatedDate(), role: randomRole() },
  { id: randomId(), name: randomTraderName(), age: 36, joinDate: randomCreatedDate(), role: randomRole() },
  { id: randomId(), name: randomTraderName(), age: 19, joinDate: randomCreatedDate(), role: randomRole() },
  { id: randomId(), name: randomTraderName(), age: 28, joinDate: randomCreatedDate(), role: randomRole() },
  { id: randomId(), name: randomTraderName(), age: 23, joinDate: randomCreatedDate(), role: randomRole() },
];

function CustomFooter({ setRows, setRowModesModel, selectedIds, setSelectedIds, rowModesModel, rows }) {
  const handleAddClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleEditClick = () => {
    if (selectedIds.length === 0) return;

    setRowModesModel((oldModel) => {
      const newModel = { ...oldModel };
      selectedIds.forEach((id) => {
        newModel[id] = { mode: GridRowModes.Edit };
      });
      return newModel;
    });
  };

  const handleDeleteClick = () => {
    setRows((oldRows) => oldRows.filter((row) => !selectedIds.includes(row.id)));
    setSelectedIds([]);
  };

  const handleSaveClick = () => {
    setRowModesModel((oldModel) => {
      const newModel = { ...oldModel };
      Object.keys(newModel).forEach((id) => {
        newModel[id] = { mode: GridRowModes.View };
      });
      return newModel;
    });
    setSelectedIds([]);
  };

  const handleCancelClick = () => {
    setRowModesModel((oldModel) => {
      const newModel = { ...oldModel };
      selectedIds.forEach((id) => {
        newModel[id] = { mode: GridRowModes.View, ignoreModifications: true };
      });
      return newModel;
    });

    const editedRows = rows.filter((row) => selectedIds.includes(row.id) && row.isNew);
    if (editedRows.length > 0) {
      setRows((oldRows) => oldRows.filter((row) => !selectedIds.includes(row.id)));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        borderTop: '1px solid #ddd',
        backgroundColor: '#fafafa',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
          Add record
        </Button>
        <Button
          color="secondary"
          startIcon={<EditIcon />}
          onClick={handleEditClick}
          disabled={selectedIds.length === 0}
        >
          Edit selected
        </Button>
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
          disabled={selectedIds.length === 0}
        >
          Delete selected
        </Button>
        <Button
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSaveClick}
          disabled={selectedIds.length === 0}
        >
          Save changes
        </Button>
        <Button
          color="default"
          startIcon={<CancelIcon />}
          onClick={handleCancelClick}
          disabled={selectedIds.length === 0}
        >
          Cancel
        </Button>
      </Box>
      <Box>
        <GridPagination />
      </Box>
    </Box>
  );
}

export default function DataGridTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((oldRows) => oldRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSelectionChange = (newSelectionModel) => {
    console.log('Selected IDs:', newSelectionModel);
    setSelectedIds(newSelectionModel);
  };

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={[
          { field: 'name', headerName: 'Name', width: 180, editable: true },
          { field: 'age', headerName: 'Age', type: 'number', width: 80, align: 'left', headerAlign: 'left', editable: true },
          { field: 'joinDate', headerName: 'Join date', type: 'date', width: 180, editable: true },
          { field: 'role', headerName: 'Department', width: 220, editable: true, type: 'singleSelect', valueOptions: ['Market', 'Finance', 'Development'] },
        ]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          footer: CustomFooter,
        }}
        slotProps={{
          footer: { setRows, setRowModesModel, selectedIds, setSelectedIds, rowModesModel, rows },
        }}
        checkboxSelection
        rowSelectionModel={selectedIds}
        onRowSelectionModelChange={handleSelectionChange}
        pagination
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}
