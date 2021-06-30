import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Nav from "../../components/navbar/nav";

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

const AccountPage = () => {
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
  }, []);

  const classes = useStyles();

  return (
    <>
      <div>
        <h1>Sam Account</h1>
        <Grid
          container
          className={classes.root}
          spacing={2}
          style={{ flexWrap: "nowrap", maxWidth: "100%" }}
        >
          <Grid item className={classes.left}>
            <div></div>
          </Grid>
          <Grid item className={classes.right}>
            <div></div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AccountPage;
