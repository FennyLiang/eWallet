import React from 'react';
import pageStyle from './css'
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const prices = [300,500,1000,'其他'];

export default class AddMoney extends React.Component {

  constructor(props){
    super(props);

    this.state={
      selected: prices[0],
      errorText:'',
    }

  }

  createCards(prices) {
    const selectedStyle = {border:'#4ac6e8 solid 2px'};

    return prices.map((price) => {
        return (
          <div style={{ width: parseInt((screen.width-56)/prices.length)-10, float: 'left', padding: 5 }}>
            <Card style={this.state.selected == price ? selectedStyle : null}
                  onTouchTap={()=>{this.setState({selected: price})}}>
              <CardText>{price}</CardText>
            </Card>
          </div>
        )
    })
  }

  validationPrice() {
    if(this.state.selected == prices[prices.length-1]){

      const priceText = this.refs.targetVal.getValue();
      if(parseInt(priceText) <300) {
        this.setState({errorText : '請輸入300元以上金額'});
      }
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
      </div>
    )
  }
}

