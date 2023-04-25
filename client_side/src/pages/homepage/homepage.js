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
  vinplayer: {
    position: "relative",
    top: "-15px",
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
const durContext = createContext({
  curDur: 0,
  setCurDur: () => {},
});

//-----------------------------HOMEPAGE RAFCE
const HomePage = () => {
  const [temp, setTemp] = useState("");
  const [curDur, setCurDur] = useState(0);
  const [curRec, setCurRec] = useState("");
  const [mlData, setMldata] = useState({
    summarytxt: "",
    audiotxt: "",
    pdfurl: "",
  });
  const dlvalue = { curDur, setCurDur };
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
          <durContext.Provider value={dlvalue}>
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

                  {/* // maxWidth: "60%", */}
                  <Grid
                    item
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "8px",
                      maxWidth: "1000vh",
                      minWidth: "100vh",
                      flexShrink: "3",
                    }}
                    className="centerdiv"
                  >
                    {/* <div className="centerdiv"> */}
                    <Vplayer />
                    {curRec ? (
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
                            Transcription
                          </h1>
                          <p className={classes.summaryp}>{mlData.audiotxt}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="notrec">
                        <p>Please Select a Recording..!!</p>
                      </div>
                    )}
                    {/* </div> */}
                  </Grid>
                  <Grid
                    item
                    style={{
                      paddingLeft: "0",
                      paddingRight: "0",
                      maxWidth: "25%",
                      flexShrink: "3",
                      maxHeight: "10px",
                    }}
                  >
                    <LeftTabs />
                  </Grid>
                </Grid>
              </div>
            </>
          </durContext.Provider>
        </mlContext.Provider>
      </recContext.Provider>
    </recurldata.Provider>
  );
};

export { durContext };
export { recurldata };
export { recContext };
export { mlContext };
export default HomePage;
