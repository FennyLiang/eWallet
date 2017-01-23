import React from 'react'
import PaymentList from '../component/PaymentList'
import AddMoney from '../component/AddMoney'

export default class PaymentPageOne extends React.Component{

  constructor(props){
    super(props);
  }


  render(){

    return(
      <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <AddMoney />
        <PaymentList onSelect={this.props.changePageState.bind(this, 2)}/>
      </div>
    )
  }

}



