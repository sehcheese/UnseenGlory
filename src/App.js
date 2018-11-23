import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import BookIcon from '@material-ui/icons/Book';
import Hidden from '@material-ui/core/Hidden';
import Poem from './Poem';

import { poems, poemOrder } from './poems';
import { unseenGloryColors, randomUnseenGloryColor } from './unseenGloryColors';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBarTitle: {
    width: '100%',
    textAlign: 'center',
  },
  appBarTitleElement: {
    display: 'inline',
    verticalAlign: 'middle',
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
  },
});

const white = '#FFF';

class App extends Component {
  constructor() {
    super();

    const unFragmentColor = randomUnseenGloryColor();
    const seenFragmentColor = randomUnseenGloryColor(unFragmentColor);
    const gloryFragmentColor = unseenGloryColors.filter(color => color !== unFragmentColor && color !== seenFragmentColor)[0];

    this.state = {
      chevronColorLeft: white,
      chevronColorRight: white,
      unFragmentColor,
      seenFragmentColor,
      gloryFragmentColor,
      bookIconColor: white,
      activePoemIndex: null,
      showReferences: false,
    }
  }

  advancePoemLeft = () => {
    const activePoemIndex = this.state.activePoemIndex !== null ? this.state.activePoemIndex : 0;
    const newActivePoemIndex = activePoemIndex === 0 ? poemOrder.length - 1 : activePoemIndex - 1;
    this.setState(() => ({ activePoemIndex: newActivePoemIndex }));
  }

  advancePoemRight = () => {
    const activePoemIndex = this.state.activePoemIndex !== null ? this.state.activePoemIndex : -1;
    this.setState(() => ({ activePoemIndex: (activePoemIndex + 1) % poemOrder.length }));
  }

  onEnterChevronLeft = () => {
    this.setState(() => ({ chevronColorLeft: randomUnseenGloryColor(this.state.chevronColorLeft) }));
  }

  onLeaveChevronLeft = () => {
    this.setState(() => ({ chevronColorLeft: white }));
  }

  onEnterChevronRight = () => {
    this.setState(() => ({ chevronColorRight: randomUnseenGloryColor(this.state.chevronColorRight) }));
  }

  onLeaveChevronRight = () => {
    this.setState(() => ({ chevronColorRight: white }));
  }

  onEnterTitleFragment = () => {
    const unFragmentColor = randomUnseenGloryColor(this.state.unFragmentColor);
    const seenFragmentColor = randomUnseenGloryColor(unFragmentColor);
    const gloryFragmentColor = unseenGloryColors.filter(color => color !== unFragmentColor && color !== seenFragmentColor)[0];

    this.setState(() => ({
      unFragmentColor,
      seenFragmentColor,
      gloryFragmentColor,
    }));
  }

  onEnterShowReferences = () => {
    this.setState(() => ({ bookIconColor: randomUnseenGloryColor(this.state.bookIconColor) }));
  }

  onLeaveShowReferences = () => {
    this.setState(() => ({ bookIconColor: white }));
  }

  onClickShowReferences = () => {
    this.setState(() => ({ showReferences: !this.state.showReferences }));
  }

  render() {
    const { classes } = this.props;

    let content;
    if (this.state.activePoemIndex !== null) {
      content = <Poem activePoem={poems[poemOrder[this.state.activePoemIndex]]} />;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <div className={classes.appBarTitle}>
              <Hidden smDown>
                <IconButton
                  className={classes.appBarTitleElement}
                  color="inherit" aria-label="Left"
                  onMouseEnter={this.onEnterChevronLeft}
                  onMouseLeave={this.onLeaveChevronLeft}
                  onClick={this.advancePoemLeft}
                >
                  <ChevronLeft style={{color: this.state.chevronColorLeft}} fontSize="large" alignmentBaseline="middle" />
                </IconButton>
              </Hidden>
              <Typography className={classes.appBarTitleElement} variant="h5" color="inherit" align="center">
                <span
                  className={classes.title}
                  style={{color: this.state.unFragmentColor}}
                  onMouseEnter={this.onEnterTitleFragment}
                >
                  UN
                </span>
                <span
                  className={classes.title}
                  style={{color: this.state.seenFragmentColor}}
                  onMouseEnter={this.onEnterTitleFragment}
                >
                  SEEN
                </span>
                <span className={classes.title}> </span>
                <span
                  className={classes.title}
                  style={{color: this.state.gloryFragmentColor}}
                  onMouseEnter={this.onEnterTitleFragment}
                >
                  GLORY
                </span>
              </Typography>
              <Hidden smDown>
                <IconButton
                  className={classes.appBarTitleElement}
                  color="inherit" aria-label="Right"
                  onMouseEnter={this.onEnterChevronRight}
                  onMouseLeave={this.onLeaveChevronRight}
                  onClick={this.advancePoemRight}
                >
                  <ChevronRight style={{color: this.state.chevronColorRight}} fontSize="large" alignmentBaseline="middle" />
                </IconButton>
              </Hidden>
            </div>
            <IconButton
              color="inherit"
              aria-label="Right"
              onMouseEnter={this.onEnterShowReferences}
              onMouseLeave={this.onLeaveShowReferences}
              onClick={this.onClickShowReferences}
            >
              <BookIcon style={{color: this.state.bookIconColor}} alignmentBaseline="middle" />
            </IconButton>
          </Toolbar>
        </AppBar>
        {content}
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
