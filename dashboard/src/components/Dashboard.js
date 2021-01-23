import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import SimpleTable from "./SimpleTable";
import ComplexTable from "./ComplexTable";

import blue from "@material-ui/core/colors/blue";
import Fab from "@material-ui/core/Fab";
import Refresh from "@material-ui/icons/Refresh";
import Paper from "@material-ui/core/Paper";

import DashboardStyles from "../styles/DashboardStyles";

import { attendenceRef } from "../config/firebase";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"cursive"'
  },
  palette: {
    primary: { light: blue[300], main: blue[500], dark: blue[700] }
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personGroupId: "employees",
      allClassList: [],
      allFireBaseData: []
    };
  }
  componentDidMount() {
    const thisRef = this;

    attendenceRef.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var date = childSnapshot.key;
        var childData = childSnapshot.val();

        var personId = childData.key;

        // console.log(date);
        // console.log(childData);

        for (personId in childData) {
          // console.log(personId);

          var subDetails = childData[personId];
          const nameKey = "name";
          const imgKey = "img";


          const name = subDetails[nameKey];

          const img = subDetails[imgKey];


          const finalObj = {
            attendDate: date,
            personName: name,
            personImg: img
          };
          console.log(finalObj);

          thisRef.setState(prevState => ({
            allFireBaseData: [...prevState.allFireBaseData, finalObj]
          }));
        }
      });
    });
  }

  refreshClassList = () => {
    fetch(
      `https://centralindia.api.cognitive.microsoft.com/face/v1.0/persongroups/${
        this.state.personGroupId
      }/persons`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FACE_API_KEY
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ allClassList: data });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >                                                                                                                                               
A Way In              </Typography>
            </Toolbar>
          </AppBar>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Typography variant="h4" gutterBottom component="h2">
              Todays Attnedence
            </Typography>
            <div className={classes.tableContainer}>
              <ComplexTable FireData={this.state.allFireBaseData} />
            </div>

            
            {/* <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart />
          </Typography> */}
            {/* <div className={classes.allListConstainer}>
            <Typography variant="h4" gutterBottom component="h2">
              Overall Class List
             
            </Typography>
            <SimpleTable allClassList={this.state.allClassList} />
              </div> */}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(DashboardStyles)(Dashboard);
