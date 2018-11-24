import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';

const styles = {
  home: {
    maxWidth: '700px',
    margin: '10px auto',
  },
  homeContent: {
    margin: '10px 10px',
    textAlign: 'center',
  },
  quote: {
    fontStyle: 'italic',
  },
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.home}>
        <Typography className={classes.homeContent}>
          poems by Scott Hoelsema
        </Typography>
        <Divider />
        <Typography className={classes.homeContent}>
          <span className={classes.quote}>"And we all, who with unveiled faces contemplate the Lord’s glory, are being transformed into his image with ever-increasing glory, which comes from the Lord, who is the Spirit."</span><br />
          2 Corinthians 3:18
        </Typography>
        <Typography className={classes.homeContent}>
          <span className={classes.quote}>"Though you have not seen him, you love him; and even though you do not see him now, you believe in him and are filled with an inexpressible and glorious joy."</span><br />
          1 Peter 1:8
        </Typography>
        <Typography className={classes.homeContent}>
          <span className={classes.quote}>"The glory must be believed."</span><br />
          Søren Kierkegaard
        </Typography>
        <Divider />
        <Typography className={classes.homeContent}>
          If this poetry seems didactic, it is only because I am instructing my own soul.<br />
          If this poetry seems dogmatic, it is only because I am convincing myself.<br />
          If this poetry seems enigmatic, it is only because I grasp at mysteries.<br />
          If this poetry seems poetic, perhaps I've succeeded.<br />
        </Typography>
        <Divider />
        <Typography className={classes.homeContent}>
          Referring to Christ, Kierkegaard said, "the glory must be believed." So it is too for his followers, who share in his suffering, comfort, and glory. Ours too is the lowliness of the manger and the cross - a life dense with unseen glory. It must be believed not because it does not exist, but because often it is hard to see, to reconcile with our circumstances.<br /><br />
          Today, Christmas Eve 2018, I have released publicly poetry from the last three years to the Unseen Glory collection. I'd be honored if you checked it out, and am always glad to talk about it. The site now has a toggle to reveal references to influencing sources. Thank you, friends, for helping me to believe the glory.
        </Typography>
        <Divider />
        <Typography className={classes.homeContent}>
          Thanks to <a href="https://reactjs.org/">React</a>, <a href="https://github.com/facebook/create-react-app">Create React App</a>, <a href="https://reacttraining.com/react-router/">React Router</a>, and <a href="https://material-ui.com/">Material-UI</a> for making it easy to make this website. See the code on <a href="https://github.com/sehcheese/UnseenGlory">Github</a>.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
