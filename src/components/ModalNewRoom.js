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


export default function ModalNewRoom( {counter, setCounter, hotelId}) {
  
  const [open, setOpen] = React.useState(false);
  const [cost, setCost] = useState(0);
  const [taxes, setTaxes] = useState('');
  const [status, setStatus] = useState('');
  const [typeOfRoom, setTypeOfRoom] = useState('');

  const contentTypeOfRoom = [{name:"Presidencial",value:"Precidencial"},{name:"Suite",value:"Suite"},{name:"Individual",value:"Individual"},{name:"Doble",value:"Doble"},{name:"Triple",value:"Triple"}];
  const contentActiveOrInactive = [{name:"Active",value:"Active"},{name:"Inactive",value:"Inactive"}];
  const [data, setData] = useLocalStorage('habitaciones',{});
  //console.log(data);

  const handledSubmitForm = (event) => {
    event.preventDefault();

    const small_id = uuid().slice(0,8)

    let dataStrutured = 
    {
      "id": small_id,
      "idHotel": hotelId,
      "cost": cost,
      "taxes": taxes,
      "status": status,
      "typeOfRoom": typeOfRoom
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
        id="buttonNewRoom"
      >
        <AddIcon />
      </ButtonAdd>
      
        <FormControl>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog layout="center" size="lg" variant="outlined">
              <form onSubmit={handledSubmitForm}>
                <h1 style={{ textAlign:"center"}}>REGISTRO DE LA HABITACION</h1>
                <Grid spacing={1} container columns={{ xs: 6, sm: 6, md: 12 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField style={{padding:5}} id="outlined-basic-costo-base" label="Costo base" variant="outlined" fullWidth  required onChange={e =>{ setCost(e.target.value)}}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField style={{padding:5}} id="outlined-basic-impuestos" label="Impuestos" fullWidth variant="outlined" required onChange={e =>{ setTaxes(e.target.value)}}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ minWidth: "100%" }} style={{padding:5}} fullWidth>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label-typeOfRoom">Tipo de habitacion</InputLabel>
                        <Select
                          labelId="demo-simple-select-label-typeOfRoom"
                          id="demo-simple-select"
                          value={typeOfRoom}
                          label="Tipo de habitacion"
                          onChange={e =>{ setTypeOfRoom(e.target.value)}}
                          required
                        >
                          {contentTypeOfRoom.map((item) => {
                              return <MenuItem value={item.value}>{item.name}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ minWidth: "100%" }} style={{padding:5}} fullWidth>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label-status">Estado</InputLabel>
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
