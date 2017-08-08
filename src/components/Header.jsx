import React, { Component } from 'react';

export interface HeaderProps { companyName: string }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Header extends Component<HeaderProps, undefined> {
    render() {
        return <header><h1>{this.props.companyName}</h1></header>;
    }
}
