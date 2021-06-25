import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./listofcalls.css";
import Frame from "react-frame-component";
import CallCard from "../callcard/callcard";

const ListOfCalls = () => {
  return (
    // <Frame>
    <div className="loc-container">
      <div className="loc">
        <h3 style={{ margin: "0 10px 10px 0", padding: "30px 10px 0 10px" }}>
          All Recording's
        </h3>
      </div>
      <CallCard />
      <hr />
      <CallCard />
      <hr /> <CallCard /> <hr />
      <CallCard /> <hr />
      <CallCard />
    </div>
    // </Frame>
  );
};

export default ListOfCalls;
