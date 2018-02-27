import React, { Component } from 'react';
import { withStyles, Button } from 'material-ui';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

@withStyles(styles)
@observer
class ButtonLink extends Component {
  render() {
    const { children, to, ...rest } = this.props;
    return (
      <Button to={to} component={Link} {...rest}>
        {children}
      </Button>
    );
  }
}

export default ButtonLink;
