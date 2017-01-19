import React from 'react';
import reactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import indexStyle from './walletIndex.css';
import 'whatwg-fetch';
import AddMoney from './component/AddMoney'




class App extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();

    this.state = {

    };

  }
  static propTypes = {
    children: React.PropTypes.node,
  };


  style =  {
    padding: 20,
    marginTop: 20,
  };

  fadeinStyle = {
    animationDelay: 0.7,
    opacity:1
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={ {...this.fadeinStyle, paddingLeft: 20, paddingRight: 20 } } className={indexStyle.fadeIn} >
          <AddMoney />

        </div>
      </MuiThemeProvider>
    )
  }
}
// }

reactDom.render(<App />, document.getElementById('app'));