import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../homepage/homepage";
import AccountPage from "../accountpage/accountpage";
import Nav from "../../components/navbar/nav";

const Inside = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/home" component={HomePage} exact></Route>
          <Route path="/profile" component={AccountPage} exact></Route>{" "}
        </Switch>{" "}
      </BrowserRouter>{" "}
    </>
  );
};

export default Inside;
