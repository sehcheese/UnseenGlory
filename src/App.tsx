import React, { useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  ListItemButton,
  Box,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CoffeeIcon from "@mui/icons-material/LocalCafe";
import BookIcon from "@mui/icons-material/Book";
import MenuIcon from "@mui/icons-material/Menu";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Home } from "./Home";
import { PoemPage } from "./PoemPage";

import {
  poems,
  alphabeticallyOrderedPoems,
  semanticallyOrderedPoems,
} from "./poems";
import { unseenGloryColors, randomUnseenGloryColor } from "./unseenGloryColors";
import ScrollToTop from "./ScrollToTop";

const transitionDuration = 800;

const classes = {
  root: {
    flexGrow: 1,
  },
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
};

const white = "#FFF";

interface TitleColors {
  readonly un: string;
  readonly seen: string;
  readonly glory: string;
}

export function App() {
  const unInitialColor = randomUnseenGloryColor();
  const seenInitialColor = randomUnseenGloryColor(unInitialColor);
  const gloryInitialColor = unseenGloryColors.filter(
    (color) => color !== unInitialColor && color !== seenInitialColor,
  )[0];
  const [chevronColorLeft, setChevronColorLeft] = useState(white);
  const [chevronColorRight, setChevronColorRight] = useState(white);
  const [titleColors, setTitleColors] = useState<TitleColors>({
    un: unInitialColor,
    seen: seenInitialColor,
    glory: gloryInitialColor,
  });
  const [bookIconColor, setBookIconColor] = useState(white);
  const [activePoemIndex, setActivePoemIndex] = useState<number | null>(() => {
    const poemSlug = window.document.location.pathname.substring(1);
    if (semanticallyOrderedPoems.includes(poemSlug as any)) {
      return semanticallyOrderedPoems.indexOf(poemSlug as any);
    }
    return null;
  });
  const [showReferences, setShowReferences] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [elementIn, setElementIn] = useState(true);

  function toggleDrawer() {
    setDrawerOpen((oldValue) => !oldValue);
  }

  function updateTitleColors() {
    const newUnFragmentColor = randomUnseenGloryColor(titleColors.un);
    const newSeenFragmentColor = randomUnseenGloryColor(newUnFragmentColor);
    const newGloryFragmentColor = unseenGloryColors.filter(
      (color) => color !== newUnFragmentColor && color !== newSeenFragmentColor,
    )[0];

    setTitleColors({
      un: newUnFragmentColor,
      seen: newSeenFragmentColor,
      glory: newGloryFragmentColor,
    });
  }

  function onSelectPoem(poemKey: keyof typeof poems) {
    const semanticallyOrderedPoemsIndex =
      semanticallyOrderedPoems.indexOf(poemKey);
    onSelectPoemByIndex(semanticallyOrderedPoemsIndex);
  }

  function onSelectPoemByIndex(semanticallyOrderedPoemsIndex: number) {
    if (semanticallyOrderedPoemsIndex !== -1) {
      updateTitleColors();
      setActivePoemIndex(semanticallyOrderedPoemsIndex);
    }
  }

  function getLeftPoemIndex() {
    return activePoemIndex === null && activePoemIndex === 0
      ? semanticallyOrderedPoems.length - 1
      : activePoemIndex - 1;
  }

  function advancePoemLeft() {
    const leftPoemIndex = getLeftPoemIndex();
    setActivePoemIndex(leftPoemIndex);
    onSelectPoemByIndex(leftPoemIndex);
  }

  function getRightPoemIndex() {
    return ((activePoemIndex ?? -1) + 1) % semanticallyOrderedPoems.length;
  }

  function advancePoemRight() {
    const rightPoemIndex = getRightPoemIndex();
    setActivePoemIndex(rightPoemIndex);
    onSelectPoemByIndex(rightPoemIndex);
  }

  function onEnterChevronLeft() {
    setChevronColorLeft(randomUnseenGloryColor(chevronColorLeft));
  }

  function onLeaveChevronLeft() {
    setChevronColorLeft(white);
  }

  function onEnterChevronRight() {
    setChevronColorRight(randomUnseenGloryColor(chevronColorRight));
  }

  function onLeaveChevronRight() {
    setChevronColorRight(white);
  }

  function onEnterTitleFragment() {
    updateTitleColors();
  }

  function showHome() {
    setActivePoemIndex(null);
  }

  function onEnterShowReferences() {
    setBookIconColor(randomUnseenGloryColor(bookIconColor));
  }

  function onLeaveShowReferences() {
    if (!showReferences) {
      setBookIconColor(white);
    }
  }

  function toggleShowReferences() {
    setShowReferences((oldShowReferencesValue) => !oldShowReferencesValue);
  }

  const alphabeticalPoemList = alphabeticallyOrderedPoems.map((poemKey) => (
    <Link to={`/${poemKey}`} key={poemKey}>
      <ListItemButton onClick={() => onSelectPoem(poemKey)}>
        <Typography>
          <span style={classes.drawerButtonText}>{poems[poemKey].title}</span>
        </Typography>
      </ListItemButton>
    </Link>
  ));

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <>
          <AppBar>
            <Toolbar>
              <IconButton
                onClick={this.toggleDrawer}
                sx={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
                <Box
                  sx={classes.drawer}
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer}
                  onKeyDown={this.toggleDrawer}
                >
                  {alphabeticalPoemList}
                </Box>
              </Drawer>
              <Box sx={classes.appBarTitle}>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Link to={semanticallyOrderedPoems[this.getLeftPoemIndex()]}>
                    <IconButton
                      sx={classes.appBarTitleElement}
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
                </Box>
                <Link to="/">
                  <Typography
                    sx={classes.appBarTitleElement}
                    variant="h5"
                    color="inherit"
                    align="center"
                    onClick={this.showHome}
                  >
                    <span
                      style={{
                        ...classes.title,
                        color: this.state.unFragmentColor,
                      }}
                      onMouseEnter={this.onEnterTitleFragment}
                    >
                      UN
                    </span>
                    <span
                      style={{
                        ...classes.title,
                        color: this.state.seenFragmentColor,
                      }}
                      onMouseEnter={this.onEnterTitleFragment}
                    >
                      SEEN
                    </span>
                    <span style={classes.title}> </span>
                    <span
                      style={{
                        ...classes.title,
                        color: this.state.gloryFragmentColor,
                      }}
                      onMouseEnter={this.onEnterTitleFragment}
                    >
                      GLORY
                    </span>
                  </Typography>
                </Link>
                <Box sx={{ display: { xs: "none" } }}>
                  <Link to={semanticallyOrderedPoems[this.getRightPoemIndex()]}>
                    <IconButton
                      sx={classes.appBarTitleElement}
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
                </Box>
              </Box>
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
                onClick={this.toggleShowReferences}
              >
                <BookIcon
                  style={{ color: this.state.bookIconColor }}
                  alignmentBaseline="middle"
                />
              </Button>
            </Toolbar>
          </AppBar>
          <Box />
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
                    <PoemPage
                      activePoem={poems[match.params.poemKey]}
                      showReferences={this.state.showReferences}
                    />
                  </ScrollToTop>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <AppBar sx={classes.bottomNavBar}>
              <Box sx={classes.bottomNavBarElement}>
                <Link to={semanticallyOrderedPoems[this.getLeftPoemIndex()]}>
                  <Box sx={classes.bottomNavBarArrow}>
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
                  </Box>
                </Link>
              </Box>
              <Box sx={classes.bottomNavBarElement}>
                <Link to={semanticallyOrderedPoems[this.getRightPoemIndex()]}>
                  <Box sx={classes.bottomNavBarArrow}>
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
                  </Box>
                </Link>
              </Box>
            </AppBar>
          </Box>
        </>
      </BrowserRouter>
    </>
  );
}
