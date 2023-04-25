import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";

import AccountPage from "./pages/accountpage/accountpage";
import LogSign from "./pages/loginpage/logsign";

import Home from "./pages/home";
// "proxy": "https://stgtemp.herokuapp.com",
// "proxy": "https://localhost:5000",

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/login" component={LogSign} exact></Route>
          <Route path="/home" component={HomePage} exact></Route>
          <Route path="/account" component={AccountPage} exact></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
