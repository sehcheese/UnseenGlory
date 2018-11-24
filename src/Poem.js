import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { unseenGloryColors } from './unseenGloryColors';

const styles = (theme) => ({
  title: {
    textAlign: 'center',
    fontSize: '22px',
    fontStyle: 'italic',
    marginTop: '20px',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '14px',
    fontStyle: 'italic',
    margin: '12px 0px 5px 5px',
  },
  text: {
    fontSize: '12px',
    fontStyle: 'regular',
    width: 'fit-content',
    margin: '20px auto',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

class Poem extends Component {
  state = {
    anchorEl: null,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {
    const { activePoem, classes, showReferences } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let referenceIndex = -1;
    const lines = activePoem.lines.map((lineInfo, index) => {
      if (lineInfo.line === '') {
        return <br key={index} />;
      }

      if (showReferences && lineInfo.reference !== null) {
        console.log(lineInfo.reference);
        referenceIndex++;
        const color = unseenGloryColors[referenceIndex % unseenGloryColors.length];
        return (
          <Tooltip
            title={lineInfo.reference}
            placement="left"
            disableFocusListener
            enterTouchDelay={100}
            leaveTouchDelay={3000}
            key={index}
          >
            <span style={{color}}>{lineInfo.line}<br /></span>
          </Tooltip>
        );
      }

      return <span key={index}>{lineInfo.line}<br /></span>;
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
        <Typography className={classes.title}>
          {activePoem.title}
        </Typography>
        {subtitle}
        <Typography className={classes.text}>
          {lines}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Poem);
