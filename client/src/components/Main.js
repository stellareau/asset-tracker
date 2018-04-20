import React from 'react';
import {AppBar, Button, Hidden, Icon, LinearProgress, Toolbar, Typography} from 'material-ui';
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
  componentWillMount() {
    const cookies = new Cookies();
    const authToken = cookies.get('auth');

    // if(_.isUndefined(authToken)) {
    //   history.push('/signin');
    // }
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

            <Button onClick={ () => alert('hello')}>
              <Icon className={'fas fa-bars'} style={{color: '#fff'}}/>
            </Button>
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

    {/*<Grid container alignItems={'center'} justify={'center'} direction={'column'} style={styles.container}>*/}
      {/*<Grid item xs={5}>*/}
        {/*<Button variant="raised" color="primary" style={styles.button}>*/}
          {/*<Link to="/checkout" style={styles.link}>Checkout An Item</Link>*/}
        {/*</Button>*/}

        {/*<Button variant="raised" color="secondary" style={styles.button}>*/}
          {/*<Link to="/borrowed" style={styles.link}>See Borrowed</Link>*/}
        {/*</Button>*/}

        {/*<Button variant="raised" color="secondary" style={styles.button}>*/}
          {/*<Link to="/browse" style={styles.link}>Browse</Link>*/}
        {/*</Button>*/}

        {/*<Button variant="raised" color="primary" style={styles.button}>*/}
          {/*<Link to="/register" style={styles.link}>Register</Link>*/}
        {/*</Button>*/}

        {/*<Button variant="raised" color="secondary" style={styles.button}>*/}
          {/*<Link to="/stocktake" style={styles.link}>Stocktake</Link>*/}
        {/*</Button>*/}
      {/*</Grid>*/}
    {/*</Grid>*/}
    </div>
  }
}

export default Main;
