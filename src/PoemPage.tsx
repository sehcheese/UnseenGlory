import React from "react";
import { Typography, Tooltip, Box } from "@mui/material";

import { unseenGloryColors } from "./unseenGloryColors";
import { Poem } from "./types";

interface Props {
  readonly activePoem: Poem;
  readonly showReferences: boolean;
}

export function PoemPage(props: Props) {
  const { activePoem, showReferences } = props;

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
          PopperProps={{ sx: { userSelect: "none" } }}
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
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "14px",
          fontStyle: "italic",
          margin: "12px 0px 5px 5px",
          userSelect: "none",
        }}
      >
        {activePoem.subtitle}
      </Typography>
    );
  }

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "22px",
          fontStyle: "italic",
          marginTop: "20px",
          userSelect: "none",
        }}
      >
        {activePoem.title}
      </Typography>
      {subtitle}
      <Box
        sx={{
          fontSize: "12px",
          fontStyle: "regular",
          margin: "20px 5px",
          padding: "0 0 10px 0",
          overflowX: "auto",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        <Typography
          sx={{
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          {lines}
        </Typography>
      </Box>
    </>
  );
}
