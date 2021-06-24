import ReactPlayer from "react-player/lazy";
import axios from "axios";
import { useState, useEffect } from "react";
// import AppBar from "@material-ui/core";
// import ToolBar from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import { Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  playerWrapper: {
    position: "relative",
  },
  controlsWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  },
});
const Vplayer = () => {
  const classes = useStyles();
  const [currentUrl, setcurrentUrl] = useState(
    "http://localhost:5000/recording/recording_1624542675237.webm"
  );
  const [fastLoad, setfastLoad] = useState(true);
  const retUrl = async () => {
    const res = await axios.get("http://localhost:5000/app/getrecurl");
    const data = await res.data;
    console.log(data);
    console.log(data[1].recordingUrl);
    setcurrentUrl(data[1].recordingUrl);
  };
  // useEffect(() => {
  //   if (validator === 0) {
  //     setError("Please Use a Valid Email-Id");
  //   }
  // }, [currentUrl]);
  return (
    <div>
      <div className={classes.playerWrapper}>
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          light={fastLoad}
          url={currentUrl}
          onReady={() => {
            console.log("onready");
            setfastLoad(false);
          }}
        />
        <div className={classes.controlsWrapper}></div>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          style={{ padding: 16 }}
        >
          <Grid item>
            <Typography variant="h5"></Typography>
          </Grid>
        </Grid>
      </div>
      <button
        onClick={() => {
          console.log("clicked");
          retUrl();
        }}
      >
        hello
      </button>
    </div>
  );
};

export default Vplayer;
