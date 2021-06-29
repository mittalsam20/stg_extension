import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Assemble from "./components/assemble.js/assemble";
import LogSign from "./pages/logsign";

// import Vplayer from "./components/vplayer/vplayer";
// import PopUp from "./components/html/popup";
// import Home from "./pages/home";
// import Nav from "./components/navbar/nav";
// import Footer from "./components/footer/footer";
const recurldata = createContext();

const App = () => {
  const [temp, setTemp] = useState([]);
  let recdata;
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
              <Route path="/user" component={Assemble} exact></Route>
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
