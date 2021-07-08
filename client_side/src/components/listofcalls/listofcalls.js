// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { useState } from "react";
import { useEffect, useState } from "react";
import CallCard from "./callcard";
import "./listofcalls.css";

import axios from "axios";
const ListOfCalls = () => {
  const [a, setA] = useState([]);
  const retUrl = async () => {
    const res = await axios.get("/app/getrecurl");
    const data = await res.data;
    setA(data);
  };
  useEffect(() => {
    retUrl();
  }, []);

  // console.log("just before map", a);
  // console.log(Array.isArray(a));
  return (
    <div className="loc-container">
      <div className="loc">
        <h3 style={{ margin: "0 10px 0px 0", padding: "30px 10px 0 10px" }}>
          All Recording 's{" "}
        </h3>{" "}
      </div>{" "}
      {a.map((rec) => {
        return (
          <CallCard
            Key={rec._id}
            name={rec.recordingFileName}
            date={rec.date}
            url={rec.recordingUrl}
          />
        );
      })}{" "}
    </div>
  );
};

export default ListOfCalls;
