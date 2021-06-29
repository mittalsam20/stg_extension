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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={LogSign} exact></Route>
            <Route path="/home" component={inside} exact></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
