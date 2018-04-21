import React from 'react';
import {
  AppBar, Button, ClickAwayListener, Divider, Grid, Hidden, Icon, IconButton, LinearProgress, List, ListItem,
  ListItemText, Menu, MenuItem,
  Toolbar,
  Typography
} from 'material-ui';
import Cookies from 'universal-cookie';
import './Main.css';
import CheckoutAssetPage from '../containers/CheckoutAssetPage';
import RegisterPage from '../containers/RegisterPage';
import {Route, Switch} from 'react-router';
import AssetListPage from '../containers/AssetListPage';
import history from '../history';
import StocktakePage from '../containers/StocktakePage';

const styles = {
  container: {
    height: '100vh'
  },
  button: {
    margin: '5px',
    width: '100%'
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  },
  body: {
    flex: 1
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }
  }

  componentWillMount() {
    const cookies = new Cookies();
    const authToken = cookies.get('auth');

    // if(_.isUndefined(authToken)) {
    //   history.push('/signin');
    // }
  }

  _handleMobileMenuClick(url) {
    this.setState({
      anchorEl: null
    });
    history.push(url);
  }

  _handleMenuClick(e) {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  _handleMenuClose() {
    this.setState({
      anchorEl: null
    })
  }

  render() {
    return <div>
      <AppBar position="static" style={{backgroundColor: '#263238'}}>
        <Hidden smDown>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{marginRight: '80px'}}>
              Liquid Studio Assets
            </Typography>

            <Button color="inherit" onClick={ () => history.push('/') }>Assets</Button>
            <Button color="inherit" onClick={ () => history.push('/stocktake') }>Stocktake</Button>
            <Button color="inherit" onClick={ () => history.push('/checkout') }>Checkout/Checkin</Button>
          </Toolbar>
        </Hidden>
        <Hidden mdUp>
          <Toolbar style={{display: 'flex', justifyContent: 'space-between', padding: '0 0 0 20px'}}>
            <Typography variant="title" color="inherit" style={{marginTop: '5px'}}>
              Liquid Studio Assets
            </Typography>

            <Button aria-owns={this.state.anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={(e) => this._handleMenuClick(e)}>
              <Icon className={'fas fa-bars'} style={{color: '#fff', fontSize: '24px'}}/>
            </Button>
              <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)}>
                <MenuItem onClick={() => this._handleMobileMenuClick('/')}>Assets</MenuItem>
                <MenuItem onClick={() => this._handleMobileMenuClick('/stocktake')}>Stocktake</MenuItem>
                <MenuItem onClick={() => this._handleMobileMenuClick('checkout')}>Checkout/Checkin</MenuItem>
              </Menu>
          </Toolbar>
        </Hidden>
      </AppBar>

      {(this.props.isLoading || this.props.isCheckingOut || this.props.isSubmittingSurvey) && <LinearProgress/>}

      <div style={styles.body}>
        <Switch>
          <Route exact path="/" component={AssetListPage}/>
          <Route path="/checkout" component={CheckoutAssetPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/stocktake" component={StocktakePage}/>
        </Switch>
      </div>
    </div>
  }
}

export default Main;
