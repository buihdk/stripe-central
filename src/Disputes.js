import React, { Component } from 'react';
import DisputeItem from './DisputeItem';

export default class Charges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDisputesArray: [],
        };
    }

    async componentDidMount() {
        this.props.getSecret('disputes', {'limit': 3})
        .then((disputes) => {
            this.setState({ allDisputesArray: disputes.data });
        })
    }

    render() {
        let disputeList = this.state.allDisputesArray.map((dispute) => {
            return <DisputeItem key={dispute.id} {...dispute}/>
        });
        return (
            <div>
                <h1>List of all disputes</h1>
                <div>
                    {disputeList}
                </div>
            </div>
        )
    }
}