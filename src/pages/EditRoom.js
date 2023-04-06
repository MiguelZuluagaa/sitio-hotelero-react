import React, { useEffect, useState } from "react";
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Grid, Paper } from "@mui/material";
import Input from "@mui/joy/Input";
import { useNavigate  } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import ButtonAdd from "@mui/material/Button";
import { useLocalStorage } from "../components/useLocalStorage";


const Item = styled(Paper)(({ theme }) => ({
     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
     ...theme.typography.body2,
     padding: theme.spacing(1),
     textAlign: "center",
     color: theme.palette.text.secondary,
     }));

export function EditRoom () {
     
     
     const [counter, setCounter] = useState(0);

     //DATA OF HOTEL
     const [roomId, setRoomId] = useState("");
     const [hotelId, setHotelId] = useState("");
     const [roomCost, setRoomCost] = useState("");
     const [roomTaxes, setRoomTaxes] = useState("");
     const [roomStatus, setRoomStatus] = useState("");
     const [roomTypeOf, setRoomTypeOf] = useState("");


     const [hotelStatus, setHotelStatus] = useState("");
     const [hotelQuantityRooms, setHotelQuantityRooms] = useState("");
     const [data, setData] = useLocalStorage('habitaciones',{});

     //DATA OF HOTEL
     const setDataRoomDeclare = (room) =>{
          setRoomId(room.id);
          setHotelId(room.idHotel);
          setRoomCost(room.cost);
          setRoomTaxes(room.taxes);
          setRoomStatus(room.status);
          setRoomTypeOf(room.typeOfRoom);
     }

     
     const navigate = useNavigate();
     useEffect(() =>{
          const currentLocation = window.location.href.trim();
          if(currentLocation.split('?idRoom=')[1] === ""){
               navigate("/dashboard?error=roomNotFound");
          }else{
               if(currentLocation.includes('editRoom')){
                    const idRoom = currentLocation.split('?idRoom=')[1];
                    if(idRoom.includes('&')) idRoom.split('&')[0].trim();
                    let localStorageData = window.localStorage.getItem('habitaciones');
                    localStorageData = JSON.parse(localStorageData);
                    if(localStorageData.id){
                         setDataRoomDeclare(localStorageData);
                    }else{
                         const roomFound = localStorageData.filter(room => room.id.trim() === idRoom.trim());
                         if(roomFound.length > 0){
                              setDataRoomDeclare(roomFound[0]);
                         }else{
                              navigate("/dashboard?error=roomNotFound");
                         }
                    } 
               }
          }
     }, [])

     useEffect(() => {
          
     }, [counter])


     const deleteRoom = (idRoom) => {          
          let localStorageData = window.localStorage.getItem('habitaciones');
          localStorageData = JSON.parse(localStorageData);
          const newData = localStorageData.filter(room => room.id !== idRoom);
          window.localStorage.setItem('habitaciones',JSON.stringify(newData));
     }

     const handledSubmitEditRoom = (e) =>{
          e.preventDefault();
          let idRoom = window.location.href.split('?idRoom=')[1].trim();
          if(idRoom.includes('&')) idRoom = idRoom.split('&')[0].trim();
          deleteRoom(idRoom);

          let dataStrutured = 
          {
               "id": idRoom,
               "idHotel": hotelId,
               "cost": roomCost,
               "taxes": roomTaxes,
               "status": roomStatus,
               "typeOfRoom": roomTypeOf
          };
          setData(dataStrutured);
          navigate("/editHotel?idhotel="+hotelId);
          
     }

     return(
          <Box sx={{ flexGrow: 1, m: 2}}>
               <Grid container spacing={1}>
                    <Grid xs={12}>
                         <Item style={{borderRadius:20}}>
                              <h1>FORMULARIO DE EDICION DE HABITACION</h1>
                              <form onSubmit={handledSubmitEditRoom}>
                                   <Grid container spacing={1} style={{display:'flex'}} sx={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                                        <Grid xs={12} sm={6} style={{margin:5,padding:5}}>
                                             <FormLabel>Costo:</FormLabel>
                                             <Input required placeholder="Type in here…" value={roomCost} type="number" onChange={(e) => {{setRoomCost(e.target.value)}}}/>
                                        </Grid>
                                        <Grid xs={12} sm={6} style={{margin:5,padding:5}}>
                                             <FormLabel>Impuestos:</FormLabel>
                                             <Input required placeholder="Type in here…" value={roomTaxes} type="number" onChange={(e) => {{setRoomTaxes(e.target.value)}}}/>
                                        </Grid>
                                        <Grid xs={12} sm={6} style={{margin:5,padding:5}}>
                                             <FormLabel>Estado:</FormLabel>
                                             <Select required value={roomStatus} onChange={(e, newValue) => {{setRoomStatus(newValue)}}}>
                                                  <Option value="Active">Active</Option> 
                                                  <Option value="Inactive">Inactive</Option> 
                                             </Select>
                                        </Grid>
                                        <Grid xs={12} sm={6} style={{margin:5,padding:5}}>
                                             <FormLabel>Tipo de habitacion:</FormLabel>
                                             <Select required value={roomTypeOf} onChange={(e, newValue) => {{setRoomTypeOf(newValue)}}}>
                                                  <Option value="Precidencial">Precidencial</Option> 
                                                  <Option value="Suite">Suite</Option> 
                                                  <Option value="Individual">Individual</Option> 
                                                  <Option value="Doble">Doble</Option> 
                                                  <Option value="Triple">Triple</Option> 
                                             </Select>
                                        </Grid>    
                                        <Grid xs={12} sm={6} style={{margin:5,padding:5}}>
                                             <ButtonAdd type="submit" color="success" variant="contained" fullWidth style={{ borderRadius: 20, background: "#8E4FFE", marginTop:10 }}>Actualizar</ButtonAdd>                             
                                        </Grid>
                                        <Grid xs={12} sm={6} style={{margin:5,padding:5}}>
                                             <ButtonAdd onClick={() => {navigate("/editHotel?idhotel="+hotelId)}} color="success" variant="contained" fullWidth style={{ borderRadius: 20, background: "#8E4FFE", marginTop:10 }}>REGRESAR</ButtonAdd>                             
                                        </Grid>
                                   </Grid>
                              </form>
                         </Item>
                    </Grid>
               </Grid>
          </Box>
          
     )
}