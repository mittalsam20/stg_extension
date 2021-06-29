import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import inside from "./pages/inside/inside";
import LogSign from "./pages/loginpage/logsign";
// "proxy": "https://stgtemp.herokuapp.com",

// import Vplayer from "./components/vplayer/vplayer";
// import PopUp from "./components/html/popup";
// import Home from "./pages/home";
// import Nav from "./components/navbar/nav";
// import Footer from "./components/footer/footer";
const recurldata = createContext();

const App = (props) => {
  const [temp, setTemp] = useState([]);
  let recdata;
  // console.log("chrome data " + props.name);
  const retUrl = async () => {
    const res = await axios.get("/app/getrecurl");
    const data = await res.data;
    setTemp(data);
    recdata = data;
    console.log(recdata);
  };

  useEffect(() => {
    retUrl();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div>
          <Switch>
            {/* <popUp /> */}
            <Route path="/" component={LogSign} exact></Route>
            <recurldata.Provider value={temp}>
              <Route path="/home" component={inside} exact></Route>
            </recurldata.Provider>
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
export { recurldata };
