import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  Collapse,
  IconButton,
  Card
} from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';

import cx from 'classnames';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  questionRoot: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  question: {
    flex: 1
  },
  answer: {
    flex: 1
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

@withStyles(styles)
class FaqItem extends Component {
  state = { expanded: true };
  constructor(props) {
    super();
    this.state = { expanded: !props.initialCollapsed };
  }

  render() {
    const { classes, children, question, id } = this.props;
    const { expanded } = this.state;
    return (
      <Card className={classes.root}>
        <div className={classes.questionRoot} onClick={this.toggle} id={id}>
          <Typography variant="h6" gutterBottom className={classes.question}>
            {question}
          </Typography>
          <IconButton>
            <ExpandMore
              className={cx(classes.expand, { [classes.expandOpen]: expanded })}
            />
          </IconButton>
        </div>
        <Collapse
          className={classes.answer}
          in={this.state.expanded}
          timeout="auto"
        >
          <div>{children}</div>
        </Collapse>
      </Card>
    );
  }

  toggle = () => this.setState({ expanded: !this.state.expanded });
}

export default FaqItem;
