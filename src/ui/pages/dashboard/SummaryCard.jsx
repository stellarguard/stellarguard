import React from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Divider
} from '@material-ui/core';

import { Assignment as AssignmentIcon } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.dark
  },
  count: {
    fontSize: '4rem'
  },
  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  countWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  link: {
    textDecoration: 'none'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class SummaryCard extends React.Component {
  render() {
    const { classes, rootStore } = this.props;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <AssignmentIcon />
            </Avatar>
          }
          title="Pending Transactions"
        />
        <CardContent className={classes.content}>
          <div className={classes.countWrapper}>
            <Link to="/transactions?status=pending" className={classes.link}>
              <Typography
                variant="h4"
                color="primary"
                className={classes.count}
              >
                {rootStore.currentUser.pendingTransactions.length || 0}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                color="primary"
                className={classes.view}
              >
                View
              </Typography>
            </Link>
            <Link to="/transactions/new" className={classes.link}>
              <Typography variant="body1" color="primary">
                New Transaction
              </Typography>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default SummaryCard;
