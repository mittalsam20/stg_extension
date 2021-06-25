import ListOfCalls from "../listofcalls/listofcalls";
import Nav from "../navbar/nav";
import Notes from "../notes/notes";
import Vplayer from "../vplayer/vplayer";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

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
          <Grid item xs={12}>
            <Grid container justify="strecth" spacing={2}>
              <Grid item>
                {/* <Paper className={classes.paper}> */}
                <ListOfCalls />
                {/* </Paper> */}
              </Grid>
              <Grid
                item
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  maxWidth: "60%",
                  flexShrink: "3",
                }}
              >
                {/* <Paper className={classes.paper}> */}
                <Vplayer />
                {/* </Paper> */}
              </Grid>{" "}
              <Grid item>
                {/* <Paper className={classes.paper}> */}
                <Notes />
                {/* </Paper> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Assemble;

// export default function SpacingGrid() {

//   return (

//       <Grid item xs={12}>
//         <Paper className={classes.control}>
//           <Grid container>
//             <Grid item>
//               <FormLabel>spacing</FormLabel>
//               <RadioGroup
//                 name="spacing"
//                 aria-label="spacing"
//                 value={spacing.toString()}
//                 onChange={handleChange}
//                 row
//               >
//                 {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
//                   <FormControlLabel
//                     key={value}
//                     value={value.toString()}
//                     control={<Radio />}
//                     label={value.toString()}
//                   />
//                 ))}
//               </RadioGroup>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//   );
// }
