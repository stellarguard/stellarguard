import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { observer } from 'mobx-react';

const styles = theme => ({});

@observer
@withStyles(styles)
class FormFieldHelperText extends Component {
  render() {
    const { classes, children, error, touched } = this.props;
    return error && touched ? error : children;
  }
}

export default FormFieldHelperText;
