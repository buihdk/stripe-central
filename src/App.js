import React, { Component } from 'react';
import './App.css';
import { TabList, Tab } from './Tabs';
import withStripe from './StripeAPI';
import Checkout from './Checkout';
import Charges from './Charges';
import Disputes from './Disputes';


export default class App extends Component {
  render() {
    const WrappedCheckout = withStripe(Checkout,'pk_test_3UclZGNXvs7vaLeCipmEEH0N','sk_test_YMuDqG64R99LazQOW77TLzvI')
    const WrappedCharges = withStripe(Charges,'pk_test_3UclZGNXvs7vaLeCipmEEH0N','sk_test_YMuDqG64R99LazQOW77TLzvI')
    const WrappedDisputes = withStripe(Disputes,'pk_test_3UclZGNXvs7vaLeCipmEEH0N','sk_test_YMuDqG64R99LazQOW77TLzvI')
    return (
      <TabList>
        <Tab name="Checkout" default>
          <WrappedCheckout />
        </Tab>
        <Tab name="Charges">
          <WrappedCharges />
        </Tab>
        <Tab name="Disputes">
          <WrappedDisputes />
        </Tab>  
      </TabList>  
    );
  }
}
