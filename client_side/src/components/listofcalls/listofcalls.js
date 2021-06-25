import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import "./listofcalls.css";
import Frame from "react-frame-component";
import CallCard from "../callcard/callcard";

const ListOfCalls = () => {
  const retUrl = async (req, res) => {
    res = await axios.get("http://localhost:5000/app/getrecurl");
    const data = await res.data;
    // console.log(data);
    // console.log(data[1].recordingUrl);
    return data;
  };
  //   const a[] = retUrl();
  //   retUrl();
  //   console.log(a);
  //   const m = retUrl();
  //   console.log(m);
  return (
    <div className="loc-container">
      <div className="loc">
        <h3 style={{ margin: "0 10px 10px 0", padding: "30px 10px 0 10px" }}>
          All Recording's
        </h3>
      </div>
      {/* {data.map((rec) => {
        //   console.log(rec.date);
        return (
          <CallCard Key={rec.id} name={rec.recordingFileName} date={rec.date} />
        );
      })} */}
    </div>
  );
};

export default ListOfCalls;
