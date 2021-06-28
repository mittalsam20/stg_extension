import ListOfCalls from "../listofcalls/listofcalls";
import Nav from "../navbar/nav";
import Notes from "../notes/notes";
import Vplayer from "../vplayer/vplayer";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  let userdata;
  const callMainPage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/app/main", {
        withCredentials: true,
      });
      userdata = await res.data;
      console.log(userdata);
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
            </Grid>{" "}
            <Grid item>
              <Notes />
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default Assemble;
