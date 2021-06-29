import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../homepage/homepage";
import AccountPage from "../accountpage/accountpage";
import Nav from "../../components/navbar/nav";

const Inside = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            {/* <popUp /> */}
            <Route path="/user" component={HomePage} exact></Route>
            <Route path="/user/account" component={AccountPage} exact></Route>
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </>
  );
};

export default Inside;
