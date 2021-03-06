import React from 'react'
import PaymentPageOne from '../container/PaymentPageOne'
import PaymentInfo from './PaymentInfo'



export default class PaymentRouter extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      pageState: 1,
      orderId:''
    };
    this.changePageState = this.changePageState.bind(this);
    this.props.backPageOne = this.backPageOne.bind(this)
    console.log(this)
  }

  changePageState(page, orderId) {

    this.setState({pageState: page, orderId: orderId});
  }

  backPageOne(page) {
    this.setState({pageState: page});
  }

  render(){

   switch (this.state.pageState) {
     case 1:
       return <PaymentPageOne changePageState={this.changePageState}/>;
     case 2:
       return <PaymentInfo showInfo={this.state.orderId} backPage={this.props.backPageOne}/>;

   }
  }

}