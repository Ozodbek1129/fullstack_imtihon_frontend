"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function ComboBox() {
    const category = ["electronica", "liboslar"];
  return (
    <Autocomplete
      disablePortal
      options={category}
      sx={{ width: 250}}
      renderInput={(params) => <TextField {...params} size='small' label="search"  />}
    />
  );
}
