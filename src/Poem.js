import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

const styles = {
  title: {
    textAlign: 'center',
    fontSize: '22px',
    fontStyle: 'italic',
    marginTop: '20px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '12px',
    fontStyle: 'regular',
  },
};

class Poem extends Component {
  render() {
    const { activePoem, classes } = this.props;

    const lines = activePoem.lines.map(lineInfo => {
      if (lineInfo.line === '') {
        return <br/>;
      }

      return <div>{lineInfo.line}</div>
    });

    return (
      <div>
        <Typography className={classes.title}>
          {activePoem.title}
        </Typography>
        <div>
          <Typography className={classes.text}>
            {lines}
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Poem);
