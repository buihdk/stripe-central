import React, { Component } from 'react'

export class TabList extends Component {
    constructor(props) {
        super(props);
        let defaultTab = React.Children.toArray(props.children).map((child) => child.props.name)[0];
        React.Children.forEach(props.children, (child) => {
            if (child.props.default) { defaultTab = child.props.name }
        });
        this.state = { selected: defaultTab }
        this.select = this.select.bind(this)
    }

    select(item) {
        this.setState({ selected: item })
    }

    render() {
        const tabs = React.Children.map(this.props.children, (child) => {
            const tabName = child.props.name;
            const className = (tabName === this.state.selected) ? "selected" : "unselected";
            return (
                <h1 className={className} onClick={(e) => this.select(tabName)}>
                    {tabName}
                </h1>
            )
        });
        let body;
        React.Children.forEach(this.props.children, (child) => {
            if (child.props.name === this.state.selected) { body = child }
        });
        return (
            <div className="holder">
                <div className="tabs">
                    {tabs}
                </div>
                <div className="body">
                    {body}
                </div>  
            </div>
        )
    }
}

export class Tab extends Component {
    render() {
        return this.props.children
    }
}