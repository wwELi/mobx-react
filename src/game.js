import React from 'react';
import ReactDom from 'react-dom';
import {observable, computed, action, autorun, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import './index.scss';

const BORDLEN = 10;
function judge(curr, l) {

    const sArr = toJS(square.pieces);
    const cType = sArr[curr];
    const f = curr - Math.floor(curr / BORDLEN) * BORDLEN;
    let i = 0;
    let HLen = 0;
    let VLen = 0;
    let LDLen = 0;
    let j;
    let min;
    while (i< BORDLEN) {
        if(sArr[curr - f + i] === cType) {
            HLen ++;
            if(HLen > 4) {
                Dialog('winner');
                return;
            }
        } else {
            HLen = 0;
        }
        i++
    }
    i = 0;
    while (i<= curr) {
        if(sArr[curr - Math.floor(curr / BORDLEN) * BORDLEN + i] === cType) {
            VLen ++;
            if(VLen > 4) {
                Dialog('winner');
                return
            }
        } else {
            VLen = 0;
        }
        i = i + BORDLEN;
    }
    i = 0;
    j = 1;
    min = 0;
    while (true) {
        if(curr - (BORDLEN + 1) * j < 0) {
            min = curr - (BORDLEN + 1) * (j - 1);
            break;
        }
        j++;
    }
    while (i<= 10) {
        if(sArr[min + i * (BORDLEN + 1)] === cType ) {
            LDLen ++;
            if(LDLen > 4) {
                Dialog('winner');
                return
            }
        }else {
            LDLen = 0;
        }
        i++;
    }
    i = 0;
    j = 1;
    min = 0;
    let RDLen = 0;
    while (true) {
        if(curr - (BORDLEN - 1) * j < 0) {
            min = curr - (BORDLEN - 1) * (j - 1);
            break;
        }
        j++;
    }
    while (i<= 10) {
        if(sArr[min + i * (BORDLEN - 1)] === cType ) {
            RDLen ++;
            if(RDLen > 4) {
                Dialog('winner');
                return
            }
        }else {
            RDLen = 0;
        }
        i++;
    }
}

class Square {
    @observable
    pieces = new Array(BORDLEN * BORDLEN).fill('', 0, BORDLEN * BORDLEN);

    @observable
    pieceType = false;

    @action
    drop(index, t) {
        this.pieces[index] = t;
    }

}

const square = new Square();

autorun(() => {
   // console.log(square.pieceType);
});

@observer
class Bord extends React.Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        name: 'ssss'
    };

    pie = 'O';
    drop(index) {
        this.pie = (square.pieceType = !square.pieceType) ? 'X' : 'O';
        square.drop(index, this.pie);
        judge(index);
    }

    render() {
        const { name } = this.props;
        console.log(name);
        return <div className="square" style={{width: `${ BORDLEN * 34 }px`}}>{square.pieces.map((s, index) =>
                     <button key={index} onClick={() => !square.pieces[index] && this.drop(index)}>
                         { s && <span style={ {background: s == 'X' ?  '#333' : '#fff'}}></span>}
                     </button>)}
                </div>
    }

}

function Dialog(txt) {
    const dialog = <div className="dialog">
                    <h1>{`${(square.pieceType? 'A-': 'B-') + txt}`}</h1>
                    </div>;
    ReactDom.render(dialog, dialogId);

    setTimeout(() => {
        ReactDom.unmountComponentAtNode(dialogId)
    }, 6000);
}

@observer
export default class Game extends React.Component {
    render() {
        return <div>
                    <span>{`${square.pieceType? 'B': 'A'}落棋子`}</span>
                    <button onClick={() => {square.pieces.fill('', 0, BORDLEN * BORDLEN)}}>reset</button>
                    <Bord />
                </div>
    }
}

