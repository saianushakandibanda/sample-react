// CustomHeader.js
import React from 'react';
import TextField from '@mui/material/TextField';
import { GridColumnHeaderParams } from '@mui/x-data-grid';
import { Margin } from '@mui/icons-material';

const CustomHeader = ({ colDef, filterValue, onFilterChange }) => {

  const handleMouseDown = (event) => {
    // Prevent mouse down events from bubbling up to the header click handler
    event.stopPropagation();
  };

  const handleClick = (event) => {
    // Prevent click events on the TextField from bubbling up to the header click handler
    event.stopPropagation();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>{colDef.headerName}</span>
      <TextField
        variant="standard"
        size="medium"
        value={filterValue}
        onChange={(event) => onFilterChange(colDef.field, event.target.value)}
        placeholder={`Filter ${colDef.headerName}`}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      />
    </div>
  );
};

export default CustomHeader;
