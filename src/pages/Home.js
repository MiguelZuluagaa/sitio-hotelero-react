import "../App.css";
import Appbar from "../components/Appbar";

function Home( {component} ) {

  return (
    <div className="App">
      <Appbar />
      {component}
    </div>
  );
}

export default Home;
