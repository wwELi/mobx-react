import React from 'react';
import ReactDom from 'react-dom';
import {observable, computed, action, autorun, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import './index.scss';
import imgSrc from './assit/img/bac.jpg';

const roteStore = observable({
    r: 0
});

@observer
export default class Rotate extends React.Component {

    componentDidMount() {
        const animate = () => {
            roteStore.r = roteStore.r > 360 ? 0 : roteStore.r;
            roteStore.r++;
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);

    }

    render() {
        const imgArr = new Array(8).fill('', 0, 8);
        const DEG = 360 / 8;
        return <div className="rotate">
            <div className="r_div" style={{transform: `rotateY(${roteStore.r}deg)`}}>
                {
                    imgArr.map((i, index) => <img src={ imgSrc } className="bc_img" key={ index } style={{transform: `rotateY(${ index * DEG }deg) translateZ(260px)`}}/>)
                }
            </div>
        </div>
    }
}



