import React from 'react'
import pageStyle from './css'
import 'whatwg-fetch';


export default class PaymentInfo extends React.Component{

  constructor(props){
    super(props);

    this.state={
      orderId: '',
      order: null,
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

    const resp = await fetch('https://briareus-qat.wemoscooter.com/api/wallet/GetOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        token: resultToken,
        orderId: this.props.showInfo
      }),
    });

    const {result, order} = await resp.json();
    console.log(order);
    this.setState({order: order});

  }

  componentWillMount() {
    this.selectedStatus();
  }



  render(){

    if(this.state.order == null){
      return <div>{`載入中`}</div>
    } else {
      return (
        <div>
          <h3 style={pageStyle.title}>超商付款</h3>
          <div style={{ backgroundColor: '#4ac6e8', textAlign: 'center', color:'#FFF', padding: 10 }}>
            {`請於${this.state.order.DueDate.substring(0,10)}完成繳款`}
          </div>
        </div>
      )
    }

  }

}