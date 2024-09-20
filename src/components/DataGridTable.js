// DataGridTable.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CustomHeader from './CustomHeader'; // Import the custom header component
import { alignProperty } from '@mui/material/styles/cssUtils';

const roles = ['Market', 'Finance', 'Development'];

const initialRows = [
  { id: '1', name: 'John Doe', age: 25,  role: 'Market' },
  { id: '2', name: 'Jane Smith', age: 36, role: 'Finance' },
  { id: '3', name: 'Alice Johnson', age: 19,  role: 'Development' },
  { id: '4', name: 'Bob Brown', age: 28,  role: 'Market' },
  { id: '5', name: 'Charlie Davis', age: 23,  role: 'Finance' },
];

const datagridSx = {
    ".MuiDataGrid-columnHeaderTitleContainer": {
      alignItems: "start",
    },
    "& .MuiDataGrid-columnHeaders": {
      height: "unset !important",
      maxHeight: "168px !important",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      whiteSpace: "normal",
      lineHeight: "normal",
      fontWeight: "bold",
    },
  };


export default function CustomFilterTable() {
  const [rows, setRows] = useState(initialRows);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [field]: value };
      const filteredRows = initialRows.filter((row) => {
        return Object.entries(newFilters).every(([key, filterValue]) => {
          const cellValue = row[key]?.toString().toLowerCase() || '';
          return cellValue.includes(filterValue.toLowerCase());
        });
      });
      setRows(filteredRows);
      return newFilters;
    });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 220,
      align:'left',
       headerAlign: "left",
      renderHeader: (params) => (
        <CustomHeader
          {...params}
          filterValue={filters['name'] || ''}
          onFilterChange={handleFilterChange}
        />
      ),
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 150,
      align:'left',
      headerAlign: "left",
      renderHeader: (params) => (
        <CustomHeader
          {...params}
          filterValue={filters['age'] || ''}
          onFilterChange={handleFilterChange}
        />
      ),
    },
   
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      type: 'singleSelect',
      headerAlign: "left",
      valueOptions: roles,
      renderHeader: (params) => (
        <CustomHeader
        sx={{m:0,p:0}}
          {...params}
          filterValue={filters['role'] || ''}
          onFilterChange={handleFilterChange}
        />
      ),
    },
  ];

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
      
        sx={datagridSx}
        rows={rows}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}


