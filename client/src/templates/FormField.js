import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'material-ui';

const styles = {
  formContainer: {
    marginBottom: '10px',
  },
  label: {
    padding: '0',
    marginTop: '15px',
    fontSize: '12px'
  }
};

export default class FormField extends React.Component {
  render() {
    return this.props.fullWidth ?
      <Grid container style={styles.formContainer}>
        <Grid item xs={12} style={styles.label}>
          {this.props.label}
        </Grid>
        <Grid item xs={12}>
          {this.props.children}
        </Grid>
      </Grid>
      :
      <Grid container style={styles.formContainer}>
        <Grid item xs={2} style={styles.label}>
          {this.props.label}:
        </Grid>
        <Grid item xs={10}>
          {this.props.children}
        </Grid>
      </Grid>
  }
}

FormField.propTypes = {
  label: PropTypes.string,
};