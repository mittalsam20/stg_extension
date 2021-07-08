import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../homepage/homepage";
import AccountPage from "../accountpage/accountpage";
import Nav from "../../components/navbar/nav";
import axios from "axios";
import { useEffect, useHistory, useState } from "react";

const Inside = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route
            path={`/home/${rootUser._id}`}
            component={HomePage}
            exact
          ></Route>
          <Route
            path={`/profile/${rootUser._id}`}
            component={AccountPage}
            exact
          ></Route>{" "}
        </Switch>{" "}
      </BrowserRouter>{" "}
    </>
  );
};

export default Inside;
