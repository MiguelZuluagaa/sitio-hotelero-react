import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import AddIcon from "@mui/icons-material/Add";
import ButtonAdd from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Unstable_Grid2";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { v4 as uuid } from 'uuid';


export default function BasicModalDialog( {counter, setCounter}) {
  
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState(0);
  const [status, setStatus] = useState('');

  const contentActiveOrInactive = [{name:"active",value:"Active"},{name:"inactive",value:"Inactive"}];
  const [data, setData] = useLocalStorage('hoteles',{});

  const handledSubmitForm = (event) => {
    event.preventDefault();

    const small_id = uuid().slice(0,8)
    const dateCreate = new Date();

    let dataStrutured = 
    {
      "id": small_id,
      "name": name,
      "rooms": rooms,
      "status": status,
      "editionComplete":"false",
      "dateCreated": dateCreate
    };
    setData(dataStrutured);
    setOpen(false)
  }

  return (
    <React.Fragment>
      <ButtonAdd
        color="success"
        variant="contained"
        style={{ borderRadius: 20, background: "#8E4FFE" }}
        onClick={() => setOpen(true)}
        id="buttonNewHotel"
      >
        <AddIcon />
      </ButtonAdd>
      
        <FormControl>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog layout="center" size="lg" variant="outlined">
              <form onSubmit={handledSubmitForm}>
                <h1 style={{ textAlign:"center"}}>REGISTRO DE HOTEL</h1>
                <Grid spacing={1} container columns={{ xs: 6, sm: 6, md: 12 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField style={{padding:5}} id="outlined-basic-hotel-name" label="Nombre" variant="outlined" fullWidth  required onChange={e =>{ setName(e.target.value)}}/>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField style={{padding:5}} id="outlined-basic-numero-habitaciones" label="Numero de habitaciones" fullWidth variant="outlined" required onChange={e =>{ setRooms(e.target.value)}}/>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box sx={{ minWidth: "100%" }} style={{padding:5}} fullWidth>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={status}
                          label="Estado"
                          onChange={e =>{ setStatus(e.target.value)}}
                          required
                        >
                          {contentActiveOrInactive.map((item) => {
                              return <MenuItem value={item.value}>{item.name}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>      
                <ButtonAdd onClick={() => { setCounter(counter+1)}}type="submit" color="success" variant="contained" fullWidth style={{ borderRadius: 20, background: "#8E4FFE", marginTop:10 }}>Registrar</ButtonAdd>
              </form>
            </ModalDialog>
          </Modal>
        </FormControl>
      
    </React.Fragment>
  );
}
