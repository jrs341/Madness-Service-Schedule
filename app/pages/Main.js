import React from 'react'
import { Container } from 'react-grid-system'
// --------------Setup for Material-Ui -----------------------------
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { cyan500 } from 'material-ui/styles/colors'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
// -----------------------------------------------------------------

// import NavBar from '../Components/Navbar/NavBar'
// import Footer from '../Components/Footer/Footer'
// adjust this style if the size of the nav or footer changes
const style = {
  marginTop: 70,
  marginBottom: 80,
  width: '100%'
};

const muiTheme = getMuiTheme({
  calendar: {
    width: 250
  },
  datePicker: {
    selectColor: cyan500,
  }
});

export default class Main extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div style={style}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
