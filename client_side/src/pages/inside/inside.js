import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../homepage/homepage";
import AccountPage from "../accountpage/accountpage";
import Nav from "../../components/navbar/nav";

const Inside = () => {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Switch>
          <Route path="/user" component={HomePage} exact></Route>
          <Route path="/user/account" component={AccountPage} exact></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Inside;
