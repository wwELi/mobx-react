import React from 'react';
import { render } from 'react-dom';
import { observable, computed, action, autorun } from 'mobx'
import { observer, inject} from 'mobx-react'

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
            store.name  = await p();
        } catch (e) {
            store.name = e;
        }
    }
}

const store = new Store();

autorun(() => {console.log(store.name)});

setTimeout(() => {
   store.name = 'BBB';
}, 2000);

const App = observer(() => {
	return <span onClick={() => store.setName()}>{store.age}</span>
});

render(<App />, document.getElementById('app'));