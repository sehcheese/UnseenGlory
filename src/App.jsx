import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import BookIcon from '@material-ui/icons/Book';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';
import Home from './Home';
import Poem from './Poem';

import { poems, alphabeticallyOrderedPoems, semanticallyOrderedPoems } from './poems';
import { unseenGloryColors, randomUnseenGloryColor } from './unseenGloryColors';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: theme.mixins.toolbar,
  appBarTitle: {
    width: '100%',
    textAlign: 'center',
  },
  appBarTitleElement: {
    display: 'inline',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  menuButton: {
    marginLeft: -12,
  },
  title: {
    verticalAlign: 'middle',
  },
  drawer: {
    backgroundColor: 'black',
  },
  drawerButtonText: {
    color: 'white',
  },
  bottomNavBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  bottomNavBarElement: {
    flexGrow: 1,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
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
      drawerOpen: false,
      transition: true,
    }
  }

  toggleDrawer = () => {
    this.setState(() => ({ drawerOpen: !this.state.drawerOpen }));
  }

  onSelectPoem = (poemKey) => {
    const activePoemIndex = semanticallyOrderedPoems.indexOf(poemKey);
    if (activePoemIndex !== -1) this.setState(() => ({ activePoemIndex }));
  }

  advancePoemLeft = () => {
    const activePoemIndex = this.state.activePoemIndex !== null ? this.state.activePoemIndex : 0;
    const newActivePoemIndex = activePoemIndex === 0 ? semanticallyOrderedPoems.length - 1 : activePoemIndex - 1;
    const newFragmentColors = this.newFragmentColors();
    this.setState(() => ({ activePoemIndex: newActivePoemIndex, ...newFragmentColors }));
  }

  advancePoemRight = () => {
    const activePoemIndex = this.state.activePoemIndex !== null ? this.state.activePoemIndex : -1;
    const newFragmentColors = this.newFragmentColors();
    this.setState(() => ({ transition: false }));
    this.setState(() => ({ activePoemIndex: (activePoemIndex + 1) % semanticallyOrderedPoems.length, ...newFragmentColors, transition: true }));
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

  newFragmentColors = () => {
    const unFragmentColor = randomUnseenGloryColor(this.state.unFragmentColor);
    const seenFragmentColor = randomUnseenGloryColor(unFragmentColor);
    const gloryFragmentColor = unseenGloryColors.filter(color => color !== unFragmentColor && color !== seenFragmentColor)[0];

    return {
      unFragmentColor,
      seenFragmentColor,
      gloryFragmentColor,
    };
  }

  onEnterTitleFragment = () => {
    const newFragmentColors = this.newFragmentColors();
    this.setState(() => ({ ...newFragmentColors }));
  }

  showHome = () => {
    this.setState(() => ({ activePoemIndex: null }));
  }

  onEnterShowReferences = () => {
    this.setState(() => ({ bookIconColor: randomUnseenGloryColor(this.state.bookIconColor) }));
  }

  onLeaveShowReferences = () => {
    if (!this.state.showReferences) {
      this.setState(() => ({ bookIconColor: white }));
    }
  }

  onClickShowReferences = () => {
    const bookIconColor = !this.state.showReferences
      ? randomUnseenGloryColor(this.state.bookIconColor)
      : white;
    this.setState(() => ({
      showReferences: !this.state.showReferences,
      bookIconColor,
    }));
  }

  render() {
    const { classes } = this.props;

    const alphabeticalPoemList = alphabeticallyOrderedPoems.map(poemKey => (
      <ListItem button onClick={() => this.onSelectPoem(poemKey)} key={poemKey}>
        <Typography>
          <span className={classes.drawerButtonText}>{poems[poemKey].title}</span>
        </Typography>
      </ListItem>
    ));

    let content;
    if (this.state.activePoemIndex !== null) {
      content = <Poem activePoem={poems[semanticallyOrderedPoems[this.state.activePoemIndex]]} showReferences={this.state.showReferences} />;
    } else {
      content = <Home />
    }

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
              <div
                className={classes.drawer}
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
              >
                {alphabeticalPoemList}
              </div>
            </Drawer>
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
              <Typography className={classes.appBarTitleElement} variant="h5" color="inherit" align="center" onClick={this.showHome}>
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
        <div className={classes.appBar} />
        {content}
        <Hidden mdUp>
          <AppBar className={classes.bottomNavBar}>
            <IconButton
              className={classes.bottomNavBarElement}
              color="inherit" aria-label="Left"
              onMouseEnter={this.onEnterChevronLeft}
              onMouseLeave={this.onLeaveChevronLeft}
              onClick={this.advancePoemLeft}
            >
              <ChevronLeft fontSize="large" alignmentBaseline="middle" />
            </IconButton>
            <IconButton
              className={classes.bottomNavBarElement}
              color="inherit" aria-label="Right"
              onMouseEnter={this.onEnterChevronRight}
              onMouseLeave={this.onLeaveChevronRight}
              onClick={this.advancePoemRight}
            >
              <ChevronRight fontSize="large" alignmentBaseline="middle" />
            </IconButton>
          </AppBar>
          <div className={classes.appBar} />
        </Hidden>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
