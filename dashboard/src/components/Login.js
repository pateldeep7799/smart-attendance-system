import React from "react";
import PropTypes from "prop-types";

import { Avatar, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";

import LoginStyles from "../styles/LoginStyles";


import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";



const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { light: blue[300], main: blue[500], dark: blue[700] }
  }
});

class SignIn extends React.Component {
  state = {
   
  };

  render() {
    {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <div className={classes.appbar}>
              <AppBar
                position="sticky"
                color="primary"
                className={classes.appbar}
              >
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    Attendico
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
            <main className={classes.layout}>
              <div>
               

                <Paper className={classes.paper} elevation={8}>
                  <Typography component="h1" variant="h5">
                    Register
                  </Typography>
                 
                    />

                  
                </Paper>
              </div>
              <div>
               
              </div>
            </main>
          </MuiThemeProvider>
        </React.Fragment>
      );
    }
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(LoginStyles)(SignIn);
