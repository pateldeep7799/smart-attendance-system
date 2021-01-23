import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
  root: {
    width: "100%",
    overflow: "auto",
    maxHeight: 350
  },
  table: {
    minWidth: 700
  }
};

function SimpleTable(props) {
  const { classes } = props;
  const { allClassList } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name of Students</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allClassList.map((elements, key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {elements.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);

// return (
//   <Paper className={classes.root}>
//     <Table className={classes.table}>
//       <TableHead>
//         <TableRow>
//           <TableCell>Dessert (100g serving)</TableCell>
//           <TableCell align="right">Calories</TableCell>
//           <TableCell align="right">Fat (g)</TableCell>
//           <TableCell align="right">Carbs (g)</TableCell>
//           <TableCell align="right">Protein (g)</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data.map(n => (
//           <TableRow key={n.id}>
//             <TableCell component="th" scope="row">
//               {n.name}
//             </TableCell>
//             <TableCell align="right">{n.calories}</TableCell>
//             <TableCell align="right">{n.fat}</TableCell>
//             <TableCell align="right">{n.carbs}</TableCell>
//             <TableCell align="right">{n.protein}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </Paper>
// );
