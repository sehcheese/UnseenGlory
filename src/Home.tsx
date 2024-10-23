import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export function Home() {
  const homeContentSx = {
    margin: "10px 10px",
    textAlign: "center",
    userSelect: "none",
  };
  const quoteSx = { fontStyle: "italic" };
  return (
    <Box sx={{ maxWidth: "700px", margin: "10px auto" }}>
      <Typography sx={homeContentSx}>Poems by Scott Hoelsema</Typography>
      <Divider />
      <Typography sx={homeContentSx}>
        <span style={quoteSx}>
          And we all, who with unveiled faces contemplate the Lord’s glory, are
          being transformed into his image with ever-increasing glory, which
          comes from the Lord, who is the Spirit.
        </span>
        <br />2 Corinthians 3:18
      </Typography>
      <Typography sx={homeContentSx}>
        <span style={quoteSx}>
          Though you have not seen him, you love him; and even though you do not
          see him now, you believe in him and are filled with an inexpressible
          and glorious joy.
        </span>
        <br />1 Peter 1:8
      </Typography>
      <Typography sx={homeContentSx}>
        <span style={quoteSx}>
          Now faith is being sure of what we hope for and certain of what we do
          not see.
        </span>
        <br />
        Hebrews 11:1
      </Typography>
      <Typography sx={homeContentSx}>
        <span style={quoteSx}>The glory must be believed.</span>
        <br />
        Søren Kierkegaard
      </Typography>
      <Divider />
      <Typography sx={homeContentSx}>
        Referring to Christ, Kierkegaard said, "the glory must be believed." So
        it is too for his followers, who share in his suffering, comfort, and
        glory. Ours too is the lowliness of the manger and the cross - a life
        dense with unseen glory. It must be believed not because it does not
        exist, but because often it is hard to see, to reconcile with our
        circumstances.
        <br />
        <br />
        "Unseen Glory" is a collection of poetry that often meditates on this
        theme, looking for the glory of the Lord in the ordinary, and even in
        suffering. I'd be honored if you checked it out, and am always glad to
        talk about it. The site now has a toggle to reveal references to
        influencing sources. Thank you, friends, for helping me to believe and
        see the glory.
        <br />
        <br />
        Lord, show us Your glory.
      </Typography>
      <Divider />
      <Typography sx={homeContentSx}>
        Thanks to <a href="https://reactjs.org/">React</a>,{" "}
        <a href="https://github.com/facebook/create-react-app">
          Create React App
        </a>
        , <a href="https://reacttraining.com/react-router/">React Router</a>,{" "}
        <a href="https://reactcommunity.org/react-transition-group/">
          React Transition Group
        </a>
        , <a href="https://fonts.google.com/">Google Fonts</a>, and{" "}
        <a href="https://material-ui.com/">Material-UI</a> for making it easy to
        make this website. See the code on{" "}
        <a href="https://github.com/sehcheese/UnseenGlory">Github</a>.
      </Typography>
    </Box>
  );
}
