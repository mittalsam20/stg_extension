// import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src="/logo_w.png" alt="" style={{ width: "8%" }} />
          </Typography>

          <Link to="/user">Home</Link>
          <Link to="/user/account">My account</Link>

          <Link
            onClick={() => {
              axios
                .get("/app/logout", {
                  withCredentials: true,
                })
                .then((res) => {
                  history.push("/", { replace: true });
                  if (res.status !== 200) {
                    const error = new Error(res.error);
                    throw error;
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Logout
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
