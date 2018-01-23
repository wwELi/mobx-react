import React from 'react';
import ReactDom from 'react-dom';
import {observable, computed, action, autorun, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import './index.scss';

export default class model extends React.Component {

    static desc = ({alt, children}) => <span>hhhh{ alt }{ children }</span>;

    div = document.createElement('div');

    constructor() {
        super();
    }
    componentWillMount() {
        this.state = {
            tt: 'thi sisissi'
        }
        /*this.setState({
            tt: 'DDDD'
        }, () => {
            console.log('---');
        })*/
    }

    componentDidMount() {
        document.body.appendChild(this.div);
        /*this.setState({
            tt: 'DDDD'
        }, () => {
            console.log('---');
        })*/
        this.state.tt = 'BBB'
    }

    componentWillUnmount() {
        document.body.contains(this.div) && document.body.removeChild(this.div);
    }

    render () {
        return <div><div>
                {this.state.tt}
                </div></div>
    }
}



