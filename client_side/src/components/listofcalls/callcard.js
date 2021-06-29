import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import recurldata from "../../App";
// import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useContext } from "react";
import { recurldata } from "../../pages/homepage/homepage";
const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 325,
    marginBottom: "0px",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
const CallCard = (props) => {
  const { temp, setTemp } = useContext(recurldata);
  console.log("inside callcard", temp);

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent style={{ paddingBottom: "0", fontSize: "1px" }}>
          <Typography
            component="h2"
            style={{ fontWeight: "900", fontSize: "16px" }}
          >
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.date}
          </Typography>
        </CardContent>
        <CardActions className={classes.btn}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setTemp(props.url);
              console.log(temp);
            }}
          >
            Play
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CallCard;
