import React from 'react';
import pageStyle from './css'
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const prices = [300,500,1000,'其他'];

export default class AddMoney extends React.Component {

  constructor(props){
    super(props);

    this.state={
      selected: prices[0],
      errorText:'',
      getToken: ''
    }
  }


  getParameterByName =(name, url) => {
    if (!url) {
      url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    var decoUrl = decodeURIComponent(results[2].replace(/\+/g, " "));
    return decoUrl;
  };


  async intStatus(decoUrl) {
    var resultToken = this.getParameterByName('token', decoUrl);

    this.setState({getToken: resultToken})

  }

  componentWillMount() {
    this.intStatus();
  }

  createCards(prices) {
    const selectedStyle = {border:'#4ac6e8 solid 1px'};

    return prices.map((price) => {
        return (
          <div style={{ width: parseInt((screen.width-40)/prices.length)-10,
                        height: parseInt((screen.height)/11), float: 'left',
                        paddingLeft: 5,paddingRight: 5, textAlign: 'center',
                        }}>
            <Card style={this.state.selected == price ? selectedStyle : null}
                  onTouchTap={()=>{this.setState({selected: price})}}>
              <CardText style={{ lineHeight: '1.1em' }}>{price}</CardText>
            </Card>
          </div>
        )
    })
  }

  validationPrice() {

    if(this.state.selected == prices[prices.length-1]){

      const priceText = this.refs.targetVal.getValue();

      if(parseInt(priceText) < 300) {
        this.setState({errorText : '請輸入300元以上金額'});
      }else {
        this.setState({selected : priceText});

        this.forceUpdate();
        setTimeout(()=>{document.getElementById('auto-submit-form').submit();},100)

      }
    }else {
      document.getElementById('auto-submit-form').submit();
    }
  }

  render(){

    return(
      <div>
        <h3 style={pageStyle.title}>加值金額</h3>

        {this.createCards(prices)}
        {this.state.selected == prices[prices.length-1] ?
          <TextField fullWidth={true}
                     ref="targetVal"
                     hintText="請輸入300元以上加值金額"
                     errorText={this.state.errorText}/> : ''}
        <RaisedButton fullWidth={true}
                      primary={true}
                      label="加值WeMo錢包"
                      onTouchTap={this.validationPrice.bind(this)}/>

        <form  id="auto-submit-form" style={{display: 'none'}} action="https://briareus-qat.wemoscooter.com/api/wallet/orders" method="post">
          <fieldset>
            <input type="text" name="amount" value={this.state.selected}/>
            <input type="text" name="token" value={this.state.getToken}/>
          </fieldset>
        </form>

      </div>
    )
  }
}

