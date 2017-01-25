import React from 'react';
import reactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PaymentRouter from './component/PaymentRouter'
import injectTapEventPlugin from 'react-tap-event-plugin';
import indexStyle from './walletIndex.css';
import 'whatwg-fetch';


class App extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();


  }
  static propTypes = {
    children: React.PropTypes.node,
  };



  fadeinStyle = {
    animationDelay: 0.7,
    opacity:1
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={ {...this.fadeinStyle} } className={indexStyle.fadeIn} >
          <PaymentRouter/>
        </div>
      </MuiThemeProvider>
    )
  }
}
// }

reactDom.render(<App />, document.getElementById('app'));