import React from 'react';
import _ from 'lodash';

const request = (route, key, method, metadata) => {
    const dataStr = (method === 'GET') ? null : _.toPairs(metadata).map((a) => {
        return `${a[0]}=${a[1]}`;
    }).join('&');
    
    return fetch(`https://api.stripe.com/v1/${route}`, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: dataStr
    })
    .then((data) => data.json())
}

export default function withStripe(WrappedComponent, publicKey, secretKey) {
    return class extends React.Component {
        postPublic(route, metadata) {
            return request(route, publicKey, 'POST', metadata);
        }
        postSecret(route, metadata) {
            return request(route, secretKey, 'POST', metadata);
        }
        getSecret(route, metadata) {
            return request(route, secretKey, 'GET', metadata);
        }
        render() {
            return <WrappedComponent
                    postPublic={this.postPublic}
                    postSecret={this.postSecret}
                    getSecret={this.getSecret}
                    {...this.props} />
        }
    }
}