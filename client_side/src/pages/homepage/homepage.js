import ListOfCalls from "../../components/listofcalls/listofcalls";
import Notes from "../../components/notes/notesheading";
import Vplayer from "../../components/vplayer/vplayer";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Nav from "../../components/navbar/nav";
// import ScriptTag from "react-script-tag";
// import transfer from "../ext_files/js/videoeditor";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    direction: "row",
    justifyContent: "space-between ",
    alignItems: "safe stretch",
    display: "flex",
    flexWrap: "nowrap",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const HomePage = () => {
  const fetchvideo = async () => {
    try {
      // const vidblob = transfer();
      const vidblob = "ok";
      const vid = await axios.post("/app/upload", vidblob);
      const temp = await vid.data;
      console.log(temp);
    } catch (err) {
      console.log("video error", err);
    }
  };

  // const [user, setUser] = useState({});
  const history = useHistory();
  const callMainPage = async () => {
    try {
      const res = await axios.get("/app/main", {
        withCredentials: true,
      });
      const userdata = await res.data;
      console.log("assemble", userdata);
      // setUser(userdata);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("error i am finding", err);
      history.push("/");
    }
  };

  useEffect(() => {
    callMainPage();
    fetchvideo();
  }, []);

  const classes = useStyles();

  return (
    <>
      {/* <Nav /> */}

      <Grid
        container
        className={classes.root}
        spacing={2}
        style={{ flexWrap: "nowrap", maxWidth: "100%" }}
      >
        {/* <Grid container justify="strecth" spacing={2}> */}
        <Grid item>
          <ListOfCalls />
        </Grid>{" "}
        <Grid
          item
          style={{
            paddingLeft: "0px",
            paddingRight: "8px",
            maxWidth: "60%",
            flexShrink: "3",
          }}
        >
          <Vplayer />
        </Grid>{" "}
        <Grid
          item
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            maxWidth: "25%",
            flexShrink: "3",
          }}
        >
          <Notes />
        </Grid>{" "}
      </Grid>
      {/* </Grid>{" "} */}
    </>
  );
};

export default HomePage;
