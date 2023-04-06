import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({name, content}) {
  const [nameInput, seNameInput] = React.useState('');

  const handleChange = (event) => {
     seNameInput(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "100%" }} style={{padding:5}} fullWidth>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nameInput}
          label={name}
          onChange={handleChange}
          required
        >
          {content.map((item) => {
               return <MenuItem value={item.value}>{item.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}