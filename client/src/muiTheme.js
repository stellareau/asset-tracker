import { createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
  typography: {
    display2: {
      fontWeight: 300,
      color: grey[900]
    },
    display1: {
      fontWeight: 300,
      color: grey[900]
    },
    title: {
      color: grey[900]
    },
    body1: {
      fontSize: 16
    }
  },
  overrides: {
    MuiIcon: {
      root: {
        fontSize: 16
      }
    }
  }
});

export default theme;