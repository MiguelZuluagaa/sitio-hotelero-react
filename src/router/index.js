
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home"
import Dashboard  from "../pages/Dashboard";
import Precios from "../pages/Precios";
import AboutProject from  "../pages/AboutProject"
import { EditHotel } from "../pages/EditHotel";
import { EditRoom } from "../pages/EditRoom";

export const router = createBrowserRouter([
     {
          path:"/",
          element: <Home component={<AboutProject/>}/>
     },
     {
          path:"/dashboard",
          element: <Home component={<Dashboard />}/> 
     },
     {
          path:"/precios",
          element: <Home component={<Precios />}/>
     },
     {
          path:"/editHotel",
          element: <Home component={<EditHotel />}/>
     }
     ,
     {
          path:"/editRoom",
          element: <Home component={<EditRoom />}/>
     }
]);