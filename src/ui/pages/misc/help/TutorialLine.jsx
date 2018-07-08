import React, { Component } from 'react';
import cx from 'classnames';
import { withStyles, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import { ExternalLink } from '../../../components';

const styles = theme => ({
  line: {
    marginBottom: theme.spacing.unit * 2
  },
  text: {
    marginBottom: theme.spacing.unit
  },
  img: {
    maxWidth: '100%'
  }
});

@withStyles(styles)
@observer
class TutorialLine extends Component {
  render() {
    const { classes, className, children, imgSrc } = this.props;
    return (
      <div className={cx(classes.line, className)}>
        <Typography className={classes.text} variant="subheading">
          {children}
        </Typography>
        {imgSrc && (
          <ExternalLink href={imgSrc}>
            <img className={classes.img} src={imgSrc} />
          </ExternalLink>
        )}
      </div>
    );
  }
}

export default TutorialLine;
