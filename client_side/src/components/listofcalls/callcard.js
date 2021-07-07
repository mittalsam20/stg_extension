import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import recurldata from "../../App";
// import CardActionArea from "@material-ui/core/CardActionArea";
import DeleteIcon from "@material-ui/icons/Delete";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/Delete";
import { useContext } from "react";
import { recurldata } from "../../pages/homepage/homepage";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    minWidth: 290,
    maxWidth: 300,
    maxHeight: 100,
    margin: "0 5px 5px 5px",
    boxShadow: "1px 1px 3px rgb(138, 137, 137)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
    marginTop: 8,
  },
  btn: {
    position: "relative",
    bottom: "37px",
    left: "10px",
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "15px",
    float: "right",
    color: "#3f51b5",
    border: "none",
    borderRadius: "6px",
    width: "15",
    height: "36",
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      backgroundColor: "rgb(200,200,200)",
    },
  },
});
const CallCard = (props) => {
  const { temp, setTemp } = useContext(recurldata);
  console.log("inside callcard", temp);

  const classes = useStyles();
  // console.log("recirding ka name", props.name);
  return (
    <>
      <Card
        className={classes.root}
        onClick={() => {
          setTemp(props.url);
          console.log(temp);
        }}
      >
        <CardContent style={{ paddingBottom: "0", fontSize: "1px" }}>
          <Typography
            component="h2"
            style={{
              fontWeight: "900",
              fontSize: "16px",
              marginBottom: "16px",
            }}
          >
            {" "}
            {props.name}
          </Typography>{" "}
          <Typography className={classes.pos} color="textSecondary">
            {" "}
            {props.date}{" "}
          </Typography>{" "}
        </CardContent>{" "}
        <Button
          size="small"
          color="primary"
          className={classes.btn}
          onClick={() => {
            console.log("ida ida", props.Key);
            axios
              .delete(`app/delrecurl/${props.Key}`)
              .then((res) => {
                console.log(JSON.stringify(res.data));
              })
              .catch((err) => {
                console.log(err);
              });
            console.log("ss");
          }}
        >
          <DeleteIcon />
        </Button>{" "}
      </Card>{" "}
    </>
  );
};

export default CallCard;
