import { createContext, useState, useEffect } from "react";

import { useHistory } from "react-router";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import ListOfCalls from "../../components/listofcalls/listofcalls";
import Nav from "../../components/navbar/nav";
import Notes from "../../components/notes/notesheading";
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
                <p>
                  hello i am able to see the text here awesome here summary
                  hello i am able to see the text here awesome here summaryhello
                  i am able to see the text here awesome here summaryhello i am
                  able to see the text here awesome here summaryhello i am able
                  to see the text here awesome here summary
                </p>
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
                <Notes />
              </Grid>
            </Grid>
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
