import React from 'react';
import Proptypes from 'prop-types';
import {Button, Grid, Icon, IconButton, TextField, Typography} from 'material-ui';

export default class MainPageLayout extends React.Component {
  render() {
    return <Grid container justify={'center'}>
      <Grid item xs={10}>
        <Grid container alignItems={'center'}>
          <Grid item xs={!this.props.disableSearchbar ? 4 : 9}>
            <Typography variant="display2" style={{margin: '0.7em 0.5em'}}>{this.props.title}</Typography>
          </Grid>
          {!this.props.disableSearchbar &&
            <Grid item xs={5}>
              <TextField placeholder={'Search for ' + this.props.title} style={{width: '90%'}}/>
              <IconButton>
                <Icon className={'fas fa-sort-amount-down'}/>
              </IconButton>
            </Grid>
          }
          {this.props.button &&
            <Grid item xs={3}>
              <Grid container justify={'flex-end'}>
                {this.props.button}
              </Grid>
            </Grid>
          }
        </Grid>
        {this.props.table}
      </Grid>

      {this.props.children}
    </Grid>
  }
}

MainPageLayout.propTypes = {
  title: Proptypes.string,
  table: Proptypes.node,
  children: Proptypes.node,
  disableSearchbar: Proptypes.bool
};