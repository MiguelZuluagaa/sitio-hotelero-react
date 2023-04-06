import { Box, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Input from "@mui/joy/Input";
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ModalNewRoom from "../components/ModalNewRoom";
import Card from '@mui/material/Card';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CuartoHotelImg from "../images/cuarto-hotel.jpg"
import Swal from 'sweetalert2'
import ButtonAdd from "@mui/material/Button";
import { useLocalStorage } from "../components/useLocalStorage";

const Item = styled(Paper)(({ theme }) => ({
backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: "center",
color: theme.palette.text.secondary,
}));




export function EditHotel () {

     
     const [counter, setCounter] = useState(0);
     const [hotelinfo, setHotelInfo] = useState({});
     let [dataRoom, setDataRoom] = useState([]);
     let [dataRooms, setDataRooms] = useState([]);

     //DATA OF HOTEL
     const [hotelId, setHotelId] = useState("");
     const [hotelName, setHotelName] = useState("");


     const [hotelStatus, setHotelStatus] = useState("");
     const [hotelQuantityRooms, setHotelQuantityRooms] = useState("");
     const [hotelDateCreated, setHotelDateCreated] = useState("");
     const [hotelDetailRooms, setHotelDetailRooms] = useState([]);
     const [data, setData] = useLocalStorage('hoteles',{});
     //DATA OF HOTEL


     const setDataHotelDeclare = (hotel) =>{
          setHotelId(hotel.id);
          setHotelName(hotel.name);
          setHotelStatus(hotel.status);
          setHotelQuantityRooms(hotel.rooms);
          setHotelDateCreated(hotel.dateCreated);
     }

     const handledEditRoom = (idRoom) => {
          navigate("/editRoom?idRoom="+idRoom);
     }

     const handledEliminarRoom = (idRoom) =>{
     Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
     }).then((result) => {
          if (result.isConfirmed) {
               
               let localStorageData = window.localStorage.getItem('habitaciones');
               localStorageData = JSON.parse(localStorageData);
               const newData = localStorageData.filter(room => room.id !== idRoom);
               window.localStorage.setItem('habitaciones',JSON.stringify(newData));
               setDataRooms(newData.filter(room => room.id === idRoom));
               window.localStorage.setItem('habitaciones',JSON.stringify(newData));
               setCounter(counter+1);
               Swal.fire(
                    'Deleted!',
                    'The Room has been deleted.',
                    'success'
               )
          }
     })
     
     }
     
     const navigate = useNavigate();
     useEffect(() =>{
          const currentLocation = window.location.href.trim();
          if(currentLocation.split('?idhotel=')[1] === ""){
               navigate("/dashboard?error=hotelNotFound");
          }else{
               if(currentLocation.includes('editHotel')){
                    const idHotel = currentLocation.split('?idhotel=')[1];
                    if(idHotel.includes('&')) idHotel.split('&')[0].trim();
                    let localStorageData = window.localStorage.getItem('hoteles');
                    localStorageData = JSON.parse(localStorageData);
                    if(localStorageData.id){
                         setDataHotelDeclare(localStorageData);
                    }else{
                         const hotelFound = localStorageData.filter(hotel => hotel.id.trim() === idHotel.trim());
                         if(hotelFound.length > 0){
                              setDataHotelDeclare(hotelFound[0]);
                         }else{
                              navigate("/dashboard?error=hotelNotFound");
                         }
                    }
                    
               }
          }
     }, [])

     useEffect(() => {
          setTimeout(() => {
               const idHotel = window.location.href.split('?idhotel=')[1];
               if(idHotel.includes('&')) idHotel.split('&')[0].trim();
               if(window.localStorage.getItem('habitaciones')){
               const dataLocalStorage = JSON.parse(window.localStorage.getItem('habitaciones'))
               if(dataLocalStorage.id){
                    if(dataLocalStorage.idHotel === idHotel){
                         setDataRooms([{...dataLocalStorage}]);
                    }
              }else{
                    if(dataLocalStorage.length > 0){
                         const dataFilterByHotel = dataLocalStorage.filter(room => room.idHotel.trim() === idHotel.trim());
                         setDataRooms(dataFilterByHotel);
                    }
              }
            }
          }, 500);
        }, [counter])

     const deleteHotel = (idRoom) => {          
          let localStorageData = window.localStorage.getItem('hoteles');
          localStorageData = JSON.parse(localStorageData);
          const newData = localStorageData.filter(room => room.id !== idRoom);
          window.localStorage.setItem('hoteles',JSON.stringify(newData));
     }

        const handledUpdateHotel = (e) =>{
          e.preventDefault();
          deleteHotel(hotelId);
          let dataStrutured = 
          {
               "id": hotelId,
               "name": hotelName,
               "rooms": hotelQuantityRooms,
               "status": hotelStatus,
               "editionComplete":"true",
               "dateCreated": hotelDateCreated
          };
          setData(dataStrutured);
          navigate("/dashboard");
        }

     return(
          <Box sx={{ flexGrow: 1, m: 2}}>
               <Grid container spacing={1}>
                    <Grid xs={12}>
                         <Item style={{borderRadius:20}}>
                         <h1>FORMULARIO DE EDICION</h1>
                         <Grid container spacing={1} style={{display:'flex'}} sx={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                              <Grid xs={1} sm={1} style={{margin:5,padding:5,display:'flex' }} >
                                   <ButtonAdd onClick={() => {navigate("/dashboard")}} color="success" variant="contained" fullWidth style={{ borderRadius: 20, background: "#8E4FFE", marginTop:10 }}>REGRESAR</ButtonAdd>                             
                              </Grid>
                              <Grid xs={1} sm={1} style={{margin:5,padding:5,display:'flex' }} >
                                   <ButtonAdd onClick={handledUpdateHotel}  color="success" variant="contained" fullWidth style={{ borderRadius: 20, background: "#8E4FFE", marginTop:10 }}>ACTUALIZAR</ButtonAdd>                             
                              </Grid>
                         </Grid>
                              <Grid container spacing={1} style={{display:'flex'}} sx={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                                   <Grid xs={12} sm={3} style={{margin:5,padding:5}}>
                                        <FormLabel>Nombre:</FormLabel>
                                        <Input placeholder="Type in here…" value={hotelName} onChange={(e) => {{setHotelName(e.target.value)}}}/>
                                   </Grid>
                                   <Grid xs={12} sm={3} style={{margin:5,padding:5}}>
                                        <FormLabel>Cantidad de habitaciones:</FormLabel>
                                        <Input placeholder="Type in here…" value={hotelQuantityRooms} onChange={(e) => {{setHotelQuantityRooms(e.target.value)}}}/>
                                   </Grid>
                                   <Grid xs={12} sm={3} style={{margin:5,padding:5}}>
                                        <FormLabel>Estado:</FormLabel>
                                        <Select value={hotelStatus} onChange={(e, newValue) => {{setHotelStatus(newValue)}}}>
                                             <Option value="Active">Active</Option> 
                                             <Option value="Inactive">Inactive</Option> 
                                        </Select>
                                   </Grid>
                                   <Grid xs={12} sm={3} style={{margin:5,padding:5}}>
                                   <h1>HABITACIONES</h1>
                                        <ModalNewRoom counter={counter} setCounter={setCounter} hotelId={hotelId}/>
                                   </Grid>

                                   
                              </Grid>
                              <Grid container spacing={2} style={{display:'flex',marginTop:10}} sx={{justifyContent: 'center'}}>
                                   {dataRooms.map(room =>{
                                        return (
                                        <Grid md={3}> 
                                             <Card sx={{ maxWidth: 345, margin: 0, borderRadius: 5  }} style={{margin: "0 auto"}}>
                                                  <CardActionArea>
                                                  <CardMedia
                                                       component="img"
                                                       src={CuartoHotelImg}
                                                       alt="green iguana"
                                                  />
                                                  <CardContent>
                                                       <Typography variant="body2" color="text.secondary">
                                                       Tipo de habitacion: {room.typeOfRoom} <br/> Costo: {room.cost} <br/> Impuestos: {room.taxes} <br/> Stado: {room.status}
                                                       </Typography>
                                                  </CardContent>
                                                  </CardActionArea>
                                                  <CardActions>
                                                  <Button size="small" color="primary" onClick={() => {handledEditRoom(room.id)}}>
                                                       Editar
                                                  </Button>
                                                  <Button size="small" color="warning" onClick={() => {handledEliminarRoom(room.id)}}>
                                                       Eliminar
                                                  </Button>
                                                  </CardActions>
                                             </Card>
                                        </Grid>
                                        );
                                   })}
                              </Grid>
                         </Item>
                    </Grid>
               </Grid>
          </Box>
          
     )
}