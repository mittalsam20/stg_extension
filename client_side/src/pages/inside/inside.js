import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../homepage/homepage";
import AccountPage from "../accountpage/accountpage";
import Nav from "../../components/navbar/nav";
import axios from "axios";
import { useEffect } from "react";

// const fetchrec = () => {
const blobdata = { id: "userkiid", vid: "get" };
//   axios.post("/app/upload/",blobdata);
// };
// useEffect(()=>{
// fetchrec();
// },[])

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
