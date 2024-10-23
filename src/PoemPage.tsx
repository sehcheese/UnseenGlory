import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { unseenGloryColors } from "./unseenGloryColors";
import { Poem } from "./types";

const styles = () => ({
  title: {
    textAlign: "center",
    fontSize: "22px",
    fontStyle: "italic",
    marginTop: "20px",
    userSelect: "none",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    fontStyle: "italic",
    margin: "12px 0px 5px 5px",
    userSelect: "none",
  },
  text: {
    fontSize: "12px",
    fontStyle: "regular",
    margin: "20px 5px",
    padding: "0 0 10px 0",
    overflowX: "auto",
    whiteSpace: "nowrap",
    userSelect: "none",
  },
  centeredText: {
    width: "fit-content",
    margin: "0 auto",
  },
  tooltip: {
    userSelect: "none",
  },
});

interface Props {
  readonly activePoem: Poem;
  readonly classes: any;
  readonly showReferences: boolean;
}

function PoemPage(props: Props) {
  const { activePoem, classes, showReferences } = props;

  let referenceIndex = 0;
  const lines = activePoem.lines.map((lineInfo, index) => {
    if (lineInfo.line === "") {
      return <br key={index} />;
    }

    if (showReferences && lineInfo.reference !== null) {
      if (index > 0) {
        let previousLineIndex = index - 1;
        while (
          previousLineIndex > 0 &&
          activePoem.lines[previousLineIndex].reference === null
        )
          previousLineIndex--;
        const ibid =
          lineInfo.reference === activePoem.lines[previousLineIndex].reference;
        if (!ibid) referenceIndex++;
      }

      const color =
        unseenGloryColors[referenceIndex % unseenGloryColors.length];
      return (
        <Tooltip
          title={lineInfo.reference}
          placement="left"
          classes={{ popper: classes.tooltip }}
          disableFocusListener
          enterTouchDelay={100}
          leaveTouchDelay={3000}
          key={index}
        >
          <span style={{ color }}>
            {lineInfo.line}
            <br />
          </span>
        </Tooltip>
      );
    }

    return (
      <span key={index}>
        {lineInfo.line}
        <br />
      </span>
    );
  });

  let subtitle;
  if (activePoem.subtitle !== null) {
    subtitle = (
      <Typography className={classes.subtitle}>
        {activePoem.subtitle}
      </Typography>
    );
  }

  return (
    <div>
      <Typography className={classes.title}>{activePoem.title}</Typography>
      {subtitle}
      <div className={classes.text}>
        <Typography className={classes.centeredText}>{lines}</Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(PoemPage);
