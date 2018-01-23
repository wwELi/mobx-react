import React from 'react';
import {render} from 'react-dom';
import {observable, computed, action, autorun} from 'mobx'
import {observer, inject} from 'mobx-react'
import './index.scss';
import imgSrc from './assit/img/bac.jpg';
import Game from './game';
import Portal from './portal';
import Rotate from './translate';
import UpImg from './addImg';


function p() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('cacacaca');
        }, 2000);
    });
    return promise;
}

class Store {
    @observable
    name = 'AAA';

    @computed
    get age() {
        return `${this.name}---1`;
    }

    @action
    async setName() {
        try {
            store.name = await p();
        } catch (e) {
            store.name = e;
        }
    }
}

const store = new Store();

autorun(() => {
    console.log(store.name)
});

setTimeout(() => {
    store.name = 'BBB';
}, 2000);

@observer
class App extends React.Component {

    componentDidMount() {
        console.log(this.refs.childSpan);
    }

    viewDom(dom) {
        //console.log(dom);
    }

    render() {
        return (<div>
            <Rotate></Rotate>
            <span onClick={() => store.setName()} ref={dom => this.viewDom(dom)} draggable="true">{store.age}
                        <span ref='childSpan'>child</span>
                     </span>
                     <div>
                         <div className='box'
                              onDragOver={(e) => {e.preventDefault()}}
                              onDrop={(ev) => {ev.target.appendChild(this.refs.dropp)}}>
                         </div>
                         <img draggable='true' ref="dropp" src={imgSrc} className="bc_img"
                              onDragStart={ ev => { ev.dataTransfer.setData('text/plain', null) }}/>
                     </div>
                     <Game />
                     <Portal.desc alt="wwww"><span>jjj</span></Portal.desc>
                     <Portal/>
            <UpImg/>
                 </div>)
    }
}


render(<App/>, document.getElementById('app'));