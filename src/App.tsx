import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import {
  MuiThemeProvider,
  createTheme,
  withStyles,
} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import CoffeeIcon from "@material-ui/icons/LocalCafe";
import BookIcon from "@material-ui/icons/Book";
import Hidden from "@material-ui/core/Hidden";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "./Home";
import Poem from "./PoemPage";

import {
  poems,
  alphabeticallyOrderedPoems,
  semanticallyOrderedPoems,
} from "./poems";
import { unseenGloryColors, randomUnseenGloryColor } from "./unseenGloryColors";
import ScrollToTop from "./ScrollToTop";

const transitionDuration = 800;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: theme.mixins.toolbar,
  appBarTitle: {
    width: "100%",
    textAlign: "center",
  },
  appBarTitleElement: {
    display: "inline",
    verticalAlign: "middle",
    cursor: "pointer",
  },
  menuButton: {
    marginLeft: -12,
  },
  title: {
    verticalAlign: "middle",
  },
  drawer: {
    backgroundColor: "black",
  },
  drawerButtonText: {
    color: "white",
  },
  bottomNavBar: {
    top: "auto",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  bottomNavBarElement: {
    flexGrow: 1,
    textAlign: "center",
  },
  bottomNavBarArrow: {
    color: "white",
  },
  reactRouterLink: {
    textDecoration: "none",
  },
  fadeEnter: {
    opacity: 0,
  },
  fadeEnterActive: {
    opacity: 1,
    transition: `opacity ${transitionDuration}ms ease-in`,
  },
  fadeEnterDone: {
    opacity: 1,
  },
  fadeExit: {
    opacity: 1,
  },
  fadeExitActive: {
    opacity: 0,
    transition: `opacity 0ms ease-in`,
  },
  fadeExitDone: {
    opacity: 0,
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: blueGrey,
  },
  typography: {
    fontFamily: '"Bitter", serif',
    useNextVariants: true,
  },
});

const white = "#FFF";

class App extends Component {
  constructor(props) {
    super(props);

    const unFragmentColor = randomUnseenGloryColor();
    const seenFragmentColor = randomUnseenGloryColor(unFragmentColor);
    const gloryFragmentColor = unseenGloryColors.filter(
      (color) => color !== unFragmentColor && color !== seenFragmentColor,
    )[0];

    const activePoemIndex =
      window.document.location.pathname !== "/"
        ? semanticallyOrderedPoems.indexOf(
            window.document.location.pathname.substring(1),
          )
        : null;

    this.state = {
      chevronColorLeft: white,
      chevronColorRight: white,
      unFragmentColor,
      seenFragmentColor,
      gloryFragmentColor,
      bookIconColor: white,
      activePoemIndex,
      showReferences: false,
      drawerOpen: false,
      elementIn: true, // Used for transitions
    };

    this.cssTransitionClassNames = {
      enter: props.classes.fadeEnter,
      enterActive: props.classes.fadeEnterActive,
      enterDone: props.classes.fadeEnterDone,
      exit: props.classes.fadeExit,
      exitActive: props.classes.fadeExitActive,
      exitDone: props.classes.fadeExitDone,
    };
  }

  toggleDrawer = () => {
    this.setState(() => ({ drawerOpen: !this.state.drawerOpen }));
  };

  onSelectPoem = (poemKey) => {
    const activePoemIndex = semanticallyOrderedPoems.indexOf(poemKey);
    if (activePoemIndex !== -1) {
      const newFragmentColors = this.newFragmentColors();
      this.setState(() => ({ activePoemIndex, ...newFragmentColors }));
    }
  };

  getLeftPoemIndex = () => {
    const activePoemIndex =
      this.state.activePoemIndex !== null ? this.state.activePoemIndex : 0;
    const leftPoemIndex =
      activePoemIndex === 0
        ? semanticallyOrderedPoems.length - 1
        : activePoemIndex - 1;
    return leftPoemIndex;
  };

  advancePoemLeft = () => {
    const newFragmentColors = this.newFragmentColors();
    this.setState(() => ({
      activePoemIndex: this.getLeftPoemIndex(),
      ...newFragmentColors,
    }));
  };

  advancePoemRight = () => {
    const rightPoemIndex = this.getRightPoemIndex();
    const newFragmentColors = this.newFragmentColors();
    this.setState(() => ({
      activePoemIndex: rightPoemIndex,
      ...newFragmentColors,
      elementIn: true,
    }));
  };

  getRightPoemIndex = () => {
    const activePoemIndex =
      this.state.activePoemIndex !== null ? this.state.activePoemIndex : -1;
    const rightPoemIndex =
      (activePoemIndex + 1) % semanticallyOrderedPoems.length;
    return rightPoemIndex;
  };

  onEnterChevronLeft = () => {
    this.setState(() => ({
      chevronColorLeft: randomUnseenGloryColor(this.state.chevronColorLeft),
    }));
  };

  onLeaveChevronLeft = () => {
    this.setState(() => ({ chevronColorLeft: white }));
  };

  onEnterChevronRight = () => {
    this.setState(() => ({
      chevronColorRight: randomUnseenGloryColor(this.state.chevronColorRight),
    }));
  };

  onLeaveChevronRight = () => {
    this.setState(() => ({ chevronColorRight: white }));
  };

  newFragmentColors = () => {
    const unFragmentColor = randomUnseenGloryColor(this.state.unFragmentColor);
    const seenFragmentColor = randomUnseenGloryColor(unFragmentColor);
    const gloryFragmentColor = unseenGloryColors.filter(
      (color) => color !== unFragmentColor && color !== seenFragmentColor,
    )[0];

    return {
      unFragmentColor,
      seenFragmentColor,
      gloryFragmentColor,
    };
  };

  onEnterTitleFragment = () => {
    const newFragmentColors = this.newFragmentColors();
    this.setState(() => ({ ...newFragmentColors }));
  };

  showHome = () => {
    this.setState(() => ({ activePoemIndex: null }));
  };

  onEnterShowReferences = () => {
    this.setState(() => ({
      bookIconColor: randomUnseenGloryColor(this.state.bookIconColor),
    }));
  };

  onLeaveShowReferences = () => {
    if (!this.state.showReferences) {
      this.setState(() => ({ bookIconColor: white }));
    }
  };

  onClickShowReferences = () => {
    const bookIconColor = !this.state.showReferences
      ? randomUnseenGloryColor(this.state.bookIconColor)
      : white;
    this.setState(() => ({
      showReferences: !this.state.showReferences,
      bookIconColor,
    }));
  };

  render() {
    const { classes } = this.props;

    const alphabeticalPoemList = alphabeticallyOrderedPoems.map((poemKey) => (
      <Link
        to={`/${poemKey}`}
        className={classes.reactRouterLink}
        key={poemKey}
      >
        <ListItem button onClick={() => this.onSelectPoem(poemKey)}>
          <Typography>
            <span className={classes.drawerButtonText}>
              {poems[poemKey].title}
            </span>
          </Typography>
        </ListItem>
      </Link>
    ));

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <React.Fragment>
            <AppBar>
              <Toolbar>
                <IconButton
                  onClick={this.toggleDrawer}
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  open={this.state.drawerOpen}
                  onClose={this.toggleDrawer}
                >
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
                  <Hidden xsDown>
                    <Link
                      to={semanticallyOrderedPoems[this.getLeftPoemIndex()]}
                      className={classes.reactRouterLink}
                    >
                      <IconButton
                        className={classes.appBarTitleElement}
                        color="inherit"
                        aria-label="Left"
                        onMouseEnter={this.onEnterChevronLeft}
                        onMouseLeave={this.onLeaveChevronLeft}
                        onClick={this.advancePoemLeft}
                      >
                        <ChevronLeft
                          style={{ color: this.state.chevronColorLeft }}
                          fontSize="large"
                          alignmentBaseline="middle"
                        />
                      </IconButton>
                    </Link>
                  </Hidden>
                  <Link to="/" className={classes.reactRouterLink}>
                    <Typography
                      className={classes.appBarTitleElement}
                      variant="h5"
                      color="inherit"
                      align="center"
                      onClick={this.showHome}
                    >
                      <span
                        className={classes.title}
                        style={{ color: this.state.unFragmentColor }}
                        onMouseEnter={this.onEnterTitleFragment}
                      >
                        UN
                      </span>
                      <span
                        className={classes.title}
                        style={{ color: this.state.seenFragmentColor }}
                        onMouseEnter={this.onEnterTitleFragment}
                      >
                        SEEN
                      </span>
                      <span className={classes.title}> </span>
                      <span
                        className={classes.title}
                        style={{ color: this.state.gloryFragmentColor }}
                        onMouseEnter={this.onEnterTitleFragment}
                      >
                        GLORY
                      </span>
                    </Typography>
                  </Link>
                  <Hidden xsDown>
                    <Link
                      to={semanticallyOrderedPoems[this.getRightPoemIndex()]}
                      className={classes.reactRouterLink}
                    >
                      <IconButton
                        className={classes.appBarTitleElement}
                        color="inherit"
                        aria-label="Right"
                        onMouseEnter={this.onEnterChevronRight}
                        onMouseLeave={this.onLeaveChevronRight}
                        onClick={this.advancePoemRight}
                      >
                        <ChevronRight
                          style={{ color: this.state.chevronColorRight }}
                          fontSize="large"
                          alignmentBaseline="middle"
                        />
                      </IconButton>
                    </Link>
                  </Hidden>
                </div>
                <Button
                  title="Buy me a coffee"
                  color="inherit"
                  aria-label="Buy me a coffee"
                  onClick={() =>
                    window.open(
                      "https://www.buymeacoffee.com/sehcheese",
                      "_blank",
                    )
                  }
                >
                  <CoffeeIcon />
                </Button>
                <Button
                  title="Reveal references"
                  color="inherit"
                  aria-label="Reveal references"
                  onMouseEnter={this.onEnterShowReferences}
                  onMouseLeave={this.onLeaveShowReferences}
                  onClick={this.onClickShowReferences}
                >
                  <BookIcon
                    style={{ color: this.state.bookIconColor }}
                    alignmentBaseline="middle"
                  />
                </Button>
              </Toolbar>
            </AppBar>
            <div className={classes.appBar} />
            <Route exact path="/" component={Home} />
            <Route
              path="/:poemKey"
              render={({ location, match }) => (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames={this.cssTransitionClassNames}
                    timeout={transitionDuration}
                  >
                    <ScrollToTop>
                      <Poem
                        activePoem={poems[match.params.poemKey]}
                        showReferences={this.state.showReferences}
                      />
                    </ScrollToTop>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
            <Hidden smUp>
              <AppBar className={classes.bottomNavBar}>
                <div className={classes.bottomNavBarElement}>
                  <Link
                    to={semanticallyOrderedPoems[this.getLeftPoemIndex()]}
                    className={classes.reactRouterLink}
                  >
                    <div className={classes.bottomNavBarArrow}>
                      <IconButton
                        color="inherit"
                        aria-label="Left"
                        onClick={this.advancePoemLeft}
                      >
                        <ChevronLeft
                          fontSize="large"
                          alignmentBaseline="middle"
                        />
                      </IconButton>
                    </div>
                  </Link>
                </div>
                <div className={classes.bottomNavBarElement}>
                  <Link
                    to={semanticallyOrderedPoems[this.getRightPoemIndex()]}
                    className={classes.reactRouterLink}
                  >
                    <div className={classes.bottomNavBarArrow}>
                      <IconButton
                        color="inherit"
                        aria-label="Right"
                        onClick={this.advancePoemRight}
                      >
                        <ChevronRight
                          fontSize="large"
                          alignmentBaseline="middle"
                        />
                      </IconButton>
                    </div>
                  </Link>
                </div>
              </AppBar>
              <div className={classes.appBar} />
            </Hidden>
          </React.Fragment>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
