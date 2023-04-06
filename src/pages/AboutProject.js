import "../App.css";
import { Container } from "@mui/system";
import waveOne from "../images/wave-1.png";
import waveTwo from "../images/wave-2.png";
import waveTree from "../images/wave-3.png";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PolylineIcon from '@mui/icons-material/Polyline';

function AboutProject() {

  return (
    <div className="App">
      <Container maxWidth="ml" style={{ padding: 0 }}>
        <div className="images-round-one">
          <img  src={waveOne} alt="wave-1" style={{ display: "block" }} />
        </div>
        <div className="images-round-two">
          <img src={waveTwo} alt="wave-2" style={{ position: "absolute", zIndex: 0, right: "20%" }}/>
        </div>
        <div className="images-round-three" style={{ position: "absolute", right: 0 }}>
          <img src={waveTree} alt="wave-3" />
        </div>
        <Container style={{ position: "relative" }}>
          <h1 style={{ marginTop: 0 }}>
            Registra tus hoteles y gestionalos vinculandole las habitaciones y datos que alli se muestran!
          </h1>
          <Grid2 container spacing={2}>
            <Grid2 xs={12} style={{textAlign:"center", fontWeight:"300"}}>
              <h1 style={{ fontSize:40}}><PolylineIcon sx={{ mr: 1, fontSize:35 }}/> HOTEL MANAGER</h1>
                <p style={{fontSize:20}}>
                <b>HOTEL MANAGER</b> es un servicio que fue creado con el fin de que puedas
                gestionar tus <b>hoteles</b> añadiendo sus habitaciones y el contenido de sus habitaciones marcando disponibilidad
                de ellas y puedas hacer una correcta gestion de ellas.
                </p>
            </Grid2>
          </Grid2>
        </Container>
      </Container>
    </div>
  );
}

export default AboutProject;
