import { createContext, useState, useEffect } from "react";

import { useHistory } from "react-router";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "./hp.css";
import ListOfCalls from "../../components/listofcalls/listofcalls";
import Nav from "../../components/navbar/nav";
import LeftTabs from "../../components/notes/lefttabs";
import Vplayer from "../../components/vplayer/vplayer";

import Grid from "@material-ui/core/Grid";

//-------------------------Theme
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

//--------------------Creating Context API
const recurldata = createContext({
  curRec: "",
  setCurRec: () => {},
});
const recContext = createContext({
  temp: "",
  setTemp: () => {},
});
const mlContext = createContext({
  mlData: "",
  setMldata: () => {},
});
//-----------------------------HOMEPAGE RAFCE
const HomePage = () => {
  const [temp, setTemp] = useState("");
  const [curRec, setCurRec] = useState("");
  const [mlData, setMldata] = useState({
    summarytxt: "",
    audiotxt: "",
    pdfurl: "",
  });

  const mlvalue = { mlData, setMldata };
  const value = { temp, setTemp };
  const nvalue = { curRec, setCurRec };

  const history = useHistory();

  const callMainPage = async () => {
    try {
      const res = await axios.get("/app/main", {
        withCredentials: true,
      });
      const userdata = res.data;
      console.log("accpage", userdata);
      // setUser(userdata);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("error i am finding", err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callMainPage();
  }, []);

  const classes = useStyles();
  return (
    <recurldata.Provider value={value}>
      <recContext.Provider value={nvalue}>
        <mlContext.Provider value={mlvalue}>
          <>
            <div className="full">
              <Nav />
              <Grid
                container
                className={classes.root}
                spacing={2}
                style={{ flexWrap: "nowrap", maxWidth: "100%" }}
              >
                <Grid item>
                  <ListOfCalls />
                </Grid>

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
                  <div className="audiodiv">
                    <div
                      className="audiosubdiv"
                      style={{
                        padding: "8px",
                        position: "relative",
                        top: "-5px",
                      }}
                    >
                      <h1
                        className={classes.summaryh1}
                        style={{ fontSize: "30px" }}
                      >
                        Transcribtion
                      </h1>
                      <p className={classes.summaryp}>{mlData.summarytxt}</p>
                    </div>
                  </div>
                </Grid>

                <Grid
                  item
                  style={{
                    paddingLeft: "0",
                    paddingRight: "0",
                    maxWidth: "25%",
                    flexShrink: "3",
                  }}
                >
                  <LeftTabs />
                </Grid>
              </Grid>
            </div>
          </>
        </mlContext.Provider>
      </recContext.Provider>
    </recurldata.Provider>
  );
};

export { recurldata };
export { recContext };
export { mlContext };
export default HomePage;
