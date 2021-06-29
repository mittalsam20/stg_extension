import ListOfCalls from "../listofcalls/listofcalls";
import Nav from "../navbar/nav";
import Notes from "../notes/notesheading";
import Vplayer from "../vplayer/vplayer";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
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
    justifyContent: "safe space-between ",
    alignItems: "safe stretch",
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

const Assemble = () => {
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
      <Nav />
      <div className="">
        <Grid
          container
          className={classes.root}
          spacing={0}
          style={{ flexWrap: "nowrap" }}
        >
          {/* <Grid item xs={12}> */}
          <Grid container justify="strecth" spacing={2}>
            <Grid item>
              <ListOfCalls />
            </Grid>
            <Grid
              item
              style={{
                paddingLeft: "0",
                paddingRight: "0",
                maxWidth: "50%",
                flexShrink: "3",
              }}
            >
              <Vplayer />
            </Grid>
            <Grid item>
              <Notes />
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Grid>
      </div>
      <Helmet>
        <script src="../ext_files/js/videoeditor.js" type="text/javascript" />
      </Helmet>
    </>
  );
};

export default Assemble;
