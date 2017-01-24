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

  showPaymentTitle(order) {

    let typeTitle = '';
    let assignColor = '#b3b3b3';

    const type = {
      CVS: '超商付款',
      BARCODE: '二維條碼付款',
      VACC: 'ATM付款',
    };


    switch(order.status) {
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

    return(
      <div>
        <h3 style={pageStyle.title}>{type[order.paymentType]}</h3>
        <div style={{ backgroundColor: assignColor, textAlign: 'center', color:'#FFF', padding: 10 }}>
          {typeTitle}
        </div>
      </div>
    )

  }

  //列出付款詳細資訊
  showPayDetail(order) {
    let orderNo = '';
    let createTime = '';
    let payDate = '';
    let dueDay = '';


    switch(order.status) {
      case 0:
        orderNo = `訂單編號： ${order.id}`;
        createTime = `建立時間： ${order.createDate.substring(0,16)}`;
        return(
          <div style={pageStyle.paymentInfo}>
            <div>{`金額： ${order.amount} 元`}</div>
            <div style={pageStyle.paymentInline}>{orderNo}</div>
            <div style={pageStyle.paymentInline}>{createTime}</div>
            {this.showPayCode(this.state.order)}
          </div>
        );
      case 1:
        createTime = `建立時間： ${order.createDate.substring(0,16)}`;
        payDate = `繳費時間： ${order.payTime.substring(0,16)}`;
        return(
          <div style={pageStyle.paymentInfo}>
            <div>{`金額： ${order.amount} 元`}</div>
            <div style={pageStyle.paymentInline}>{createTime}</div>
            <div style={pageStyle.paymentInline}>{payDate}</div>
            {this.showPayCode(this.state.order)}
          </div>
        );
      case 2:
        createTime = `建立時間： ${order.createDate.substring(0,16)}`;
        dueDay = `截止時間： ${order.dueDate.substring(0,16)}`;
        return(
          <div style={pageStyle.paymentInfo}>
            <div>{`金額： ${order.amount} 元`}</div>
            <div style={pageStyle.paymentInline}>{createTime}</div>
            <div style={pageStyle.paymentInline}>{dueDay}</div>
            {this.showPayCode(this.state.order)}
          </div>
        );
    }
  }

  showPayCode(order){
    let resultPayCode = '';
    let barcodeImage= '';
    switch(order.paymentType){
      case "BARCODE":
        barcodeImage = this.state.order.payCode.map((image) => { return (<div style={pageStyle.barCodeWideDiv}><img style={pageStyle.barCode} src={image} /></div>); })
        return(
          <div style={pageStyle.paymentBarcode} >
            {barcodeImage}
          </div>
        );
      case "VACC":
        resultPayCode=`轉帳帳號：${order.payCode}`;
        return(
          <div style={pageStyle.paymentInline}>
            {resultPayCode}
          </div>
        );
      case "CVS":
        resultPayCode=`超商繳費代碼：${order.payCode}`;
        return(
          <div style={pageStyle.paymentInline}>
            {resultPayCode}
          </div>
        );
      default:
        return(
          <div>
            {resultPayCode}
          </div>
        );
    }
  }



  render(){

    if(this.state.order == null){
      return <div>{`載入中...`}</div>
    } else {
      return (
        <div>
          {this.showPaymentTitle(this.state.order)}
          {this.showPayDetail(this.state.order)}
          {/*{this.showPayCode(this.state.order)}*/}
        </div>
      )
    }

  }

}