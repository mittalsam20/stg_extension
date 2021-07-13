import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MainNotes from "./mainnotes";
import { useContext } from "react";
import { mlContext } from "../../pages/homepage/homepage";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
  },
}));

export default function LeftTabs() {
  const { mlData, setmldata } = useContext(mlContext);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" style={{ width: "350px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{ boxShadow: 0 }}
        >
          <Tab
            label="Notes"
            {...a11yProps(0)}
            style={{ position: "relative", width: "50%" }}
          />
          <Tab
            label="Summary"
            {...a11yProps(1)}
            style={{ position: "relative", width: "50%" }}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ padding: 0 }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <MainNotes />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div
            className="note"
            style={{
              padding: "0 8px 8px 8px",
              position: "relative",
              right: "12px",
              top: "-10px",
            }}
          >
            <h1
              style={{
                fontSize: "25px",
                padding: "10px",
                marginTop: "5px",
              }}
            >
              Summary
            </h1>
            <p
              style={{
                padding: "0  0 0 10px ",
              }}
            >
              {mlData.summarytxt}
            </p>
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
