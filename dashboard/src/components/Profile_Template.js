import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import "../styles/Profile_template.css";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function Custom_comp(props) {
  const { classes } = props;

  const { profileName, attendDate} = props;
  const { profileImg} = props;


  console.log(profileImg);

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <div class="profile-wrapper ">
          <div class="profile-body">
            <img
              src={profileImg}
              alt=""
            />
            <div class="profile-details">
              <h1>{ profileName}</h1>
              <p class="description">{  }</p>
              <p>{attendDate}</p>
            </div>
          </div>
          <div class="clearfix" />
        </div>
      </Paper>
    </div>
  );
}

Custom_comp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Custom_comp);
