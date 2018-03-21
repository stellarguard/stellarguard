import React from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography
} from 'material-ui';

import { Assignment as AssignmentIcon } from 'material-ui-icons';
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
    display: 'flex',
    justifyContent: 'center'
  },
  countWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
          <Link
            to="/transactions?status=pending"
            className={classes.countWrapper}
          >
            <Typography
              variant="display1"
              color="primary"
              className={classes.count}
            >
              {rootStore.currentUser.pendingTransactions.length || 0}
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              className={classes.view}
            >
              View
            </Typography>
          </Link>
        </CardContent>
      </Card>
    );
  }
}

export default SummaryCard;
