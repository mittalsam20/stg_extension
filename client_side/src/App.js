import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Assemble from "./components/assemble.js/assemble";
import LogSign from "./pages/logsign";

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
            {/* <popUp /> */}
            <Route path="/" component={LogSign} exact></Route>
            <Route path="/user" component={Assemble} exact></Route>
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
