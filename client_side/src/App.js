import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";

import AccountPage from "./pages/accountpage/accountpage";
import LogSign from "./pages/loginpage/logsign";

import { useContext } from "react";
import { userData } from "./context";
// "proxy": "https://stgtemp.herokuapp.com",
// "proxy": "https://localhost:5000",

// import Vplayer from "./components/vplayer/vplayer";
// import PopUp from "./components/html/popup";
// import Home from "./pages/home";
// import Nav from "./components/navbar/nav";
// import Footer from "./components/footer/footer";

const App = () => {
  const { rootUser } = useContext(userData);
  console.log("inside rootuser app,js", rootUser);

  return (
    <>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={LogSign} exact></Route>
            <Route
              path={`/home/${rootUser._id}`}
              component={HomePage}
              exact
            ></Route>
            <Route
              path={`/account/${rootUser._id}`}
              component={AccountPage}
              exact
            ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
