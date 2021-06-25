// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import axios from "axios";
import "./listofcalls.css";
import CallCard from "./callcard";

const ListOfCalls = () => {
  const [print, setPrint] = useState(["s"]);
  const retUrl = async () => {
    const res = await axios.get("http://localhost:5000/app/getrecurl");
    const data = await res.data;
    // console.log(data);
    // console.log(data[1].recordingUrl);
    setPrint(data);
    // return data;
  };
  //   setPrint(retUrl());
  retUrl();
  //   console.log(print);
  return (
    <div className="loc-container">
      <div className="loc">
        <h3 style={{ margin: "0 10px 10px 0", padding: "30px 10px 0 10px" }}>
          All Recording's
        </h3>
      </div>

      {print.map((rec) => {
        /* console.log("pradumna", rec.date); */
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
