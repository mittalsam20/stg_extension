import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  recContext,
  recurldata,
  mlContext,
} from "../../pages/homepage/homepage";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles({
  root: {
    minWidth: 290,
    maxWidth: 300,
    maxHeight: 100,
    margin: "0 8px 8px 8px",
    boxShadow: "1px 1px 3px rgb(138, 137, 137)",
    transition: "transform .05s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(240,240,240)",
      transform: "scale(1.04)",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
    marginTop: 8,
  },
  btn: {
    position: "relative",
    bottom: "54px",
    left: "12px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "15px",
    float: "right",
    color: "#3f51b5",
    border: "none",
    borderRadius: "6px",
    width: "10px",
    height: "36",
    cursor: "pointer",
    outline: "none",
    zIndex: "10",
    "&:hover": {
      backgroundColor: "rgb(200,200,200)",
    },
  },
  dbtn: {
    position: "relative",
    bottom: "53px",
    left: "23px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // marginRight: "10px",
    float: "right",
    color: "#3f51b5",
    border: "none",
    borderRadius: "6px",
    width: "10px",
    height: "36",
    cursor: "pointer",
    outline: "none",
    zIndex: "10",
    "&:hover": {
      backgroundColor: "rgb(200,200,200)",
    },
  },
});
const CallCard = (props) => {
  const { temp, setTemp } = useContext(recurldata);
  const { curRec, setCurRec } = useContext(recContext);
  const { mlData, setMldata } = useContext(mlContext);

  const getTxt = async (txturl) => {
    const res = await axios.get(txturl);
    console.log("text ka data", res.data);
    setMldata({
      summarytxt: res.data,
      audiotxt: "ss",
      pdfurl: "sssss",
    });
  };

  useEffect(() => {
    console.log(mlData);
  }, [mlData]);

  console.log("inside callcard", temp);

  const classes = useStyles();
  // console.log("recirding ka name", props.name);
  return (
    <>
      <Card className={classes.root}>
        <Button
          onClick={() => {
            setTemp(`http://localhost:5000/app${props.url}`);
            setCurRec(props.Key);
            console.log(temp);
            getTxt(
              "http://localhost:5000/app/recording/recording_1625921327939.txt"
              // "/ml/return-summary/recording_1625899142046_summary.txt"
              // "http://34.133.119.75/ml/return-summary/recording_1625899142046_summary.txt"
            );
          }}
        >
          <CardContent
            style={{
              padding: "10px 10px 10px 0",
              fontSize: "1px",
              textAlign: "left",
            }}
          >
            <Typography
              component="h2"
              style={{
                fontWeight: "900",
                fontSize: "16px",
                marginBottom: "16px",
              }}
            >
              {/* {mlData.summarytxt} */}
              {props.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.date}
            </Typography>
          </CardContent>
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.btn}
          onClick={() => {
            console.log("ida ida", props.Key);
            axios
              .delete(`app/delrecurl/${props.Key}`)
              .then((res) => {
                console.log(JSON.stringify(res.data));
              })
              .catch((err) => {
                console.log(err);
              });
            console.log("ss");
          }}
        >
          <DeleteIcon />
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.dbtn}
          onClick={() => {
            saveAs(`http://localhost:5000/app${props.url}`, props.name);
          }}
        >
          <GetAppRoundedIcon />
        </Button>
      </Card>
    </>
  );
};

export default CallCard;
