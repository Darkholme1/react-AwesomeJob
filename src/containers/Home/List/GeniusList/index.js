import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { NavBar, Menu, ActivityIndicator, PullToRefresh, ListView } from 'antd-mobile'
class GeniusList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <NavBar
                    style={{ position: 'fixed', top: '0', width: '100%' }}>
                    Here is title
                </NavBar>
            </div>
        );
    }
}

export default GeniusList;