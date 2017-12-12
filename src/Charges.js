import React, { Component } from 'react';
import ChargeItem from './ChargeItem';
import { LineChart } from 'react-easy-chart';

export default class Charges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allChargesArray: [],
            chargeID: ''
        };
        this.createRefund = this.createRefund.bind(this);
    }

    componentDidMount() {
        this.props.getSecret('charges', {'limit': 3})
        .then((charges) => {
            this.setState({ allChargesArray: charges.data });
        })
    }
    
    createRefund() {
        let id = document.getElementById('charge_id').value;
        this.props.postSecret('refunds', {'charge': id})
        .then((refund) => {
            alert(`A ${refund.amount/100} ${refund.currency.toUpperCase()} payment was refunded!`)
        })
    }


    render() {
        let chartData = []
        let chargeList = this.state.allChargesArray.map((charge, index) => {
            chartData.push({x: index + 1, y: charge.amount/100})
            return <ChargeItem key={charge.id} {...charge}/>
        });
        return (
            <div>
                <p>Charge ID: </p>
                <input 
                    id="charge_id"
                    type="string" 
                    placeholder="ch_1BYxxxxxxxxxxxxxxxxxxxxx" 
                    onChange={this.handleUserInput} 
                    value={this.state.userInput} />
                <button onClick={this.createRefund}>Ask for refund!</button>      
                
                <LineChart
                    axes
                    margin={{top: 10, right: 10, bottom: 50, left: 50}}
                    axisLabels={{x: 'test', y: 'test'}}
                    width={400}
                    height={250}
                    data={[chartData]}
                />

                <h1>List of all charges</h1>            
                <div>
                    {chargeList}
                </div>
            </div>
        )
    }
}