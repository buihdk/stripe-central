import React, { Component } from 'react'

export default class DisputeItem extends Component {
    render() {
        return (
            <div>
                <p>ID: {this.props.id}</p>
                <p>Amount: {this.props.amount/100} {this.props.currency.toUpperCase()}</p>
                <p>Charge ID: {this.props.charge}</p>
                <p>Created Date: {Date(this.props.created)}</p>
                <br/>
            </div>
        )
    }
}