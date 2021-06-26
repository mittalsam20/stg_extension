// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { useState } from "react";
import { useContext } from "react";
import CallCard from "./callcard";
import "./listofcalls.css";
import { recurldata } from "../../App";

const ListOfCalls = () => {
  const urldata = useContext(recurldata);
  // console.log(urldata);
  return (
    <div className="loc-container">
      <div className="loc">
        <h3 style={{ margin: "0 10px 10px 0", padding: "30px 10px 0 10px" }}>
          All Recording's
        </h3>
      </div>
      {urldata.map((rec) => {
        return (
          <CallCard
            Key={rec.id}
            name={rec.recordingFileName}
            date={rec.date}
            url={rec.recordingUrl}
          />
        );
      })}
    </div>
  );
};

export default ListOfCalls;
