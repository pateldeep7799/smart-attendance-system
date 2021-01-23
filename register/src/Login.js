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
import red from "@material-ui/core/colors/red";

import LoginStyles from "./styles/LoginStyles";

import Webcam from "react-webcam";

import Fab from "@material-ui/core/Fab";
import Refresh from "@material-ui/icons/Refresh";

import TextField from "@material-ui/core/TextField";

import { createPerson } from "./api/Person";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Snackbar from "@material-ui/core/Snackbar";

import SnackbarContentWrapper from "./components/SnackBarContent";

import { trainPersonGroupId } from "./api/Train";

import StyledButton from "./components/StyledButton";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:"cursive"
  },
  palette: {
    primary: { light: blue[300], main: blue[500], dark: blue[700], textSecondary: { main: red[50] } },
    background: {
      default: "#000"
    }
  }
});

class Register extends React.Component {
  state = {
    screenshot: null,
    picButtonDisable: false,
    name: "",
    rollno: "",
    phoneNo: "",
    personGroupId: "students",
    personId: "",
    snackbar: false,
    snackVariant: "error",
    snackMsg: "Opsii, Face Not Detected",
    lodingState: false
  };

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot, picButtonDisable: true });
  };

  refreshImg = () => {
    this.setState({ screenshot: null, picButtonDisable: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);



    const image = this.state.screenshot;

    const params = {
      personGroupId: this.state.personGroupId,
      name: this.state.name,
      userData: JSON.stringify({
        rollNo: this.state.rollno,
        phoneNo: this.state.phoneNo
      })
    };

    this.setState({
      lodingState:true
    })

    const personCreated = createPerson(params)
      .then(response => response.json())
      .then(body => {
        this.setState(
          {
            personId: body.personId
          },

          () => {
            personCreated.then(
              fetch(image)
                .then(res => res.blob())
                .then(blobData => {
                  console.log(blobData);
                  fetch(
                    `https://centralindia.api.cognitive.microsoft.com/face/v1.0/persongroups/${
                      this.state.personGroupId
                    }/persons/${this.state.personId}/persistedFaces`,
                    {
                      method: "post",
                      headers: {
                        "Content-Type": "application/octet-stream",
                        "Ocp-Apim-Subscription-Key":
                          process.env.REACT_APP_FACE_API_KEY
                      },
                      processData: false,
                      body: blobData
                    }
                  )
                    .then(response => response.json())
                    .then(body => {
                      if (body.persistedFaceId) {
                        this.setState({
                          lodingState:false,
                          snackbar: true,
                          snackMsg: "Yeppi, Face Add Success",
                          snackVariant: "success"
                        });
                        const paramsT = {
                          personGroupId: this.state.personGroupId
                        };
                        trainPersonGroupId(paramsT);
                      } else {
                        this.setState({
                          lodingState:false,

                          snackbar: true
                        });
                      }
                    })

                    .catch(error => {
                      console.log(error);
                    });
                })
            );
          }
        );
      })

      .catch(console.error);
  };

  handleSnackbarClick = () => {
    this.setState({ snackbar: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbar: false });
  };

  render() {
    {
      const { classes } = this.props;

      const videoConstraints = {
        facingMode: "user"
      };

      return (
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <div className={classes.appbar}>
              <AppBar
                position="sticky"
                color="primary"
                style={{ background: "transparent" }}
                className={classes.appbar}
              >
                <Toolbar>
                  <Typography variant="h3" color="inherit">
                    <strong>A Way In</strong>
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
            <main className={classes.layout}>
              <div>
                <Avatar className={classes.avatar}>
                  {/* <LockIcon /> */}

                  {this.state.screenshot ? (
                    <img alt="ops" src={this.state.screenshot} />
                  ) : (
                    <Webcam
                      ref={node => (this.webcam = node)}
                      screenshotFormat="image/jpeg"
                      height={350}
                      width={350}
                      videoConstraints={videoConstraints}
                    />
                  )}
                </Avatar>

                <Paper className={classes.paper} elevation={8}>
                  <Typography component="h1" variant="h6" color= "textSecondary">
                    Register
                  </Typography>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField
                      id="name"
                      label="Name"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="rollno"
                      label="Rollno"
                      multiline
                      InputProps={{
                        classes: {
                          input: classes.textField
                        }
                      }}
                      value={this.state.rollno}
                      onChange={this.handleChange("rollno")}
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="phoneNo"
                      label="PhoneNo"
                      className={classes.textField}
                      value={this.state.phoneNo}
                      onChange={this.handleChange("phoneNo")}
                      margin="normal"
                      fullWidth
                    />

                    <StyledButton
                      onClick={this.handleClick}
                      variant="contained"
                      color="primary"
                      className={classes.pic}
                      disabled={this.state.picButtonDisable}
                    >
                      Take pic
                    </StyledButton>

                    <Fab
                      color="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                      aria-label="Add"
                      className={classes.fab}
                      size="small"
                      onClick={this.refreshImg}
                    >
                      <Refresh />
                    </Fab>
                    <StyledButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      loading={this.state.lodingState}

                    >
                      Submit
                    </StyledButton>
                    {/* <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    > */}

                    {/* Submit
                    </Button> */}
                  </form>
                </Paper>
              </div>
              <div>
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  open={this.state.snackbar}
                  autoHideDuration={3000}
                  onClose={this.handleSnackbarClose}
                >
                  <SnackbarContentWrapper
                    onClose={this.handleSnackbarClose}
                    variant={this.state.snackVariant}
                    message={this.state.snackMsg}
                  />
                </Snackbar>
              </div>
            </main>
          </MuiThemeProvider>
        </React.Fragment>
      );
    }
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(LoginStyles)(Register);
