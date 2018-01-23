import React, { Component } from 'react';

export default class UpImg extends Component{
    constructor() {
        super();

        this.state = {
            imgSrc : ''
        }
    }

    upload() {
        const reader = new FileReader();
        const file = this.refs.uploadImg.files[0];
        reader.onload = e => {
            this.setState({
                imgSrc: reader.result
            })
        };
        reader.readAsDataURL(file)
    }

    render() {
        return <div>
            <img src={ this.state.imgSrc } width='100px' />
            <input type="file" accept="image/png" onChange={ ev => this.upload(ev)} ref='uploadImg'/>
        </div>
    }
}