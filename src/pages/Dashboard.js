import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState, useEffect } from "react";
import ModalNewHotel from "../components/ModalNewHotel";
import ImageHotel from "../images/hotel-image.jpg"
import Swal from 'sweetalert2'
import { useNavigate  } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
 
  const [counter, setCounter] = useState(0);
  let [dataHotel, setDataHotel] = useState([]);

  const navigate = useNavigate();

  const handledEditHotel = (idHotel) => {
    navigate("/editHotel?idhotel="+idHotel);
  }

  const handledEliminarHotel = (idHotel) =>{
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
        const newData = dataHotel.filter(hotel => hotel.id !== idHotel);
        setDataHotel(newData);
        window.localStorage.setItem('hoteles',JSON.stringify(newData));
        Swal.fire(
          'Deleted!',
          'The hotel has been deleted.',
          'success'
        )
      }
    })
    
  }
  
   

  useEffect(() => {
    setTimeout(() => {
      if(window.localStorage.getItem('hoteles')){
        const dataLocalStorage = JSON.parse(window.localStorage.getItem('hoteles'))
        if(dataLocalStorage.id){
          setDataHotel([{...dataLocalStorage}]);
        }else{
          setDataHotel(dataLocalStorage);
        }
      }
    }, 500);
  }, [counter])

  return (
    <Box sx={{ flexGrow: 1, m: 2}}>
      <Grid container spacing={1}>
        <Grid xs={12}>
          <Item style={{borderRadius:20}}>
              <Grid container spacing={1}>
                
                  <Grid xs={12}>
                    <Item style={{borderRadius:20}}>
                      <h1 style={{fontSize:35}}>HOTELES</h1> 
                      <Grid xs={12} style={{display:'flex'}} sx={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                        <ModalNewHotel counter={counter} setCounter={setCounter}/>
                    </Grid>
                    </Item>
                  </Grid>
                  
                
                </Grid>
                <Grid container spacing={2} style={{display:'flex'}} sx={{justifyContent: 'center'}}>
                
                {dataHotel.map(hotel =>{
                    return (
                      <Grid md={3}> 
                        <Card sx={{ maxWidth: 345, margin: 0, borderRadius: 5  }} style={{margin: "0 auto"}}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              src={ImageHotel}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {hotel.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Status: {hotel.status} <br/> Rooms: {hotel.rooms}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary" onClick={() => {handledEditHotel(hotel.id)}}>
                              Edit
                            </Button>
                            <Button size="small" color="warning" onClick={() => {handledEliminarHotel(hotel.id)}}>
                              Delete
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
    
  );
}

export default Dashboard;
