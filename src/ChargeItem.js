import React, { Component } from 'react';

export default class ChargeItem extends Component {
    render() {
        return (
            <div>
                <p>ID: {this.props.id}</p>
                <p>Amount: {this.props.amount/100} {this.props.currency.toUpperCase()}</p>
                <p>Amount refunded: {this.props.amount_refunded/100} {this.props.currency.toUpperCase()}</p>
                <p>Description: {this.props.description}</p>
                <br/>
            </div>
        )
    }
}
