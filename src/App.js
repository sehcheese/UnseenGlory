import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
// import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    verticalAlign: 'middle',
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: blueGrey,
  },
  typography: {
    fontFamily: '"Bitter", serif',
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" className={classes.grow} align="center">
              <IconButton color="inherit" aria-label="Left">
                <ChevronLeft fontSize="large" alignmentBaseline="middle" />
              </IconButton>
              <span className={classes.title} color="#333">UNSEEN GLORY</span>
              <IconButton color="inherit" aria-label="Right">
                <ChevronRight fontSize="large" alignmentBaseline="middle" />
              </IconButton>
            </Typography>

            <Button>
              Sources
            </Button>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
