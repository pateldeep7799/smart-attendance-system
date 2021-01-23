import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Profile_template from "../components/Profile_Template";

const styles = {
  root: {
    width: "100%",
    overflow: "auto",
    maxHeight: 700
  },
  table: {
    minWidth: 700
  }
};

function SimpleTable(props) {
  const { classes } = props;
  const { FireData } = props;

  console.log(FireData);

  const personDetail = {};

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date of Attendence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {FireData.map((elements, key) => (
          


            <TableRow key={key}>
              <TableCell component="th" scope="row">
                <Profile_template profileName={elements.personName}
                profileImg={elements.personImg}
                attendDate={elements.attendDate}
                />
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
