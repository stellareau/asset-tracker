import React from 'react';
import {Hidden, SwipeableDrawer} from 'material-ui';
import RegisterForm from './RegisterForm';

export default class Register extends React.Component {
  render() {
    return <div>
      {/* Full screen view */}
      <Hidden smDown>
        <SwipeableDrawer
          anchor={'right'}
          open={this.props.isDrawerOpen}
          onClose={() => this.props.toggleDrawer(false)}
          onOpen={() => this.props.toggleDrawer(true)}
        >
          <div style={{width: '550px'}}>
            <RegisterForm {...this.props}/>
          </div>
        </SwipeableDrawer>
      </Hidden>
      {/* Mobile view */}
      <Hidden mdUp>
        {
          this.props.isDrawerOpen &&
          <RegisterForm {...this.props} />
        }
      </Hidden>
    </div>
  }
}