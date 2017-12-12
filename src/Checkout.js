import React, { Component } from 'react';

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestCharge: 'None',
            userInput: '',
            userSelect: 'usd'
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserSelect = this.handleUserSelect.bind(this);
        this.createCharge = this.createCharge.bind(this)
    }

    handleUserInput(e) {
        this.setState({ userInput: e.target.value })
    }

    handleUserSelect(e) {
        this.setState({ userSelect: e.target.value })
    }

    createCharge() {
        // create a token
        // dispute card: 4000000000000259
        // success card: 4242424242424242
        this.setState({ latestCharge: 'Creating a token...' }, () => {
            this.props.postPublic('tokens', {
                'card[number]': '4000000000000259',
                'card[exp_month]': '02',
                'card[exp_year]': '2018'
            })
            .then((token) => {
                if (token.error) { 
                    alert(token.error.message) 
                }
                // use the token to create a charge'
                // console.log(token);
                this.setState({ latestCharge: 'Creating a charge...' });
                return this.props.postSecret('charges', {
                    'amount': this.state.userInput,
                    'currency': this.state.userSelect,
                    'source': token.id,
                    'description': 'test charge'
                })
            })
            .then((charge) => {
                if (charge.error) { 
                    alert(charge.error.message) 
                }
                // console.log(charge);
                this.setState({ latestCharge: charge.id }) 
            })
        })
    }

    render() {
        return (
            <div>
                <h2>Checkout</h2>
                <input 
                    type="number" 
                    placeholder="00.00" 
                    onChange={this.handleUserInput} 
                    value={this.state.userInput} />
                <select onChange={this.handleUserSelect}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                    <option value="aud">AUD</option>
                    <option value="cad">CAD</option>
                    <option value="sgd">SGD</option>
                    <option value="hkd">HKD</option>
                </select>
                <button onClick={this.createCharge}>Charge</button>
                <h3>Most recent charge:</h3>
                <p>ID: {this.state.latestCharge}</p>
                <p>Amount: {this.state.userInput/100} {this.state.userSelect.toUpperCase()}</p>

            </div>
        )
    }
}
