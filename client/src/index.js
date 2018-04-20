import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import history from './history';
import {Route, Switch} from 'react-router';
import SignIn from './components/signin/SignIn';
import MainPage from './containers/MainPage';
import {CssBaseline, MuiThemeProvider} from 'material-ui';
import theme from './muiTheme';

require('./index.css');

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

class App extends React.Component {
  render() {
    return <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Router history={history}>
            <Switch>
              <Route path="/signin" component={SignIn}/>
              <Route path="/" component={MainPage}/>
            </Switch>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </Provider>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
