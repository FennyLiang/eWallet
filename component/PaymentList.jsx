import React from 'react';
import pageStyle from './css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';




export default class PaymentList extends React.Component {

  constructor(props){
    super(props);

    this.state={
      value: null,
      orders: [],
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


  async selectedStatus(status, decoUrl) {
    var resultToken = this.getParameterByName('token', decoUrl);

    const resp = await fetch('https://briareus-qat.wemoscooter.com/api/wallet/GetOrders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        token: resultToken,
        status: status
      }),
    });
    // .then(res => res.json())
    // .then(console.log);
    const {result, orders} = await resp.json();
    console.log(result);
    this.setState({orders: orders})

    }

  componentWillMount() {
    this.selectedStatus();
  }

  paymentStatus(order){
    let typeTitle = '';
    let assignColor = '#b3b3b3';
    const type = {
      CVS: '超商付款',
      BARCODE: '二維條碼',
      VACC: 'ATM',
    };

    // type.CVS
    // type['CVS']

    switch(order.status){
      case 0:
        typeTitle = `請於${order.dueDate.substring(0,10)}完成繳款`;
        assignColor = '#4ac6e8';
      break;
      case 1:
        typeTitle = `已於${order.dueDate.substring(0,10)}完成繳款`;
        assignColor = '#b3dece';
      break;
      case 2:
        typeTitle = `已逾時`;
      break;
    }

    return (
      <div style={{margin: '20px 0px 20px 0px', border: '#ccc solid 0.1px'}}>
        <div style={{display: 'flex', flexDirection: 'raw', padding: 10}}>
          <div style={{flex: 1}}>{order.createDate.substring(0,10)}</div>
          <div style={{flex: 1, textAlign: 'center'}}>{type[order.paymentType]}</div>
          <div style={{flex: 1, textAlign: 'right'}}>{order.amount}</div>
        </div>

        <div style={{backgroundColor: assignColor, padding: 10}} onTouchTap={()=>{this.props.onSelect(order.id)}} >
          <span style={{display: 'block', textAlign: 'center', color:'#FFF'}}>{typeTitle}</span>
        </div>
      </div>
    )
  }

  handleChange(event, index, value) {
    this.setState({value: value});
    this.selectedStatus(value);
  };
  render(){
    return(
      <div>
        <h3 style={pageStyle.title}>我的訂單</h3>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          fullWidth={true}
          labelStyle={{color: '#555555'}}
        >
          <MenuItem value={null} style={{color: '#555555'}}  primaryText="全部" />
          <MenuItem value={1} style={{color: '#555555'}} primaryText="已繳款" />
          <MenuItem value={0} style={{color: '#555555'}} primaryText="未繳款" />
          <MenuItem value={2} style={{color: '#555555'}} primaryText="已逾期"/>
        </SelectField>
        {this.state.orders.map((order) => this.paymentStatus(order))}
      </div>


    )
  }
}

// PaymentList.defaultProps = {
//   orders: [
//   {
//     "WalletOrderNo": "1484713602",
//     "Amount": 300,
//     "PaymentType": "CVS",
//     "DueDate": "2017/01/21 23:59:59",
//     "PayTime": "",
//     "Status": 0,
//     "CreateDate": "2017/01/18 12:26:42"
//   },
//   {
//     "WalletOrderNo": "1484713711",
//     "Amount": 300,
//     "PaymentType": "BARCODE",
//     "DueDate": "2017/01/21 23:59:59",
//     "PayTime": "",
//     "Status": 0,
//     "CreateDate": "2017/01/18 12:28:31"
//   },
//   {
//     "WalletOrderNo": "1484719506",
//     "Amount": 300,
//     "PaymentType": "VACC",
//     "DueDate": "2017/01/21 23:59:59",
//     "PayTime": "2017/01/18 17:11:05",
//     "Status": 1,
//     "CreateDate": "2017/01/18 14:05:06"
//   }
// ]}
