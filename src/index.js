import './index.css';

// import { createStore } from 'redux';

const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

// very close to the createStore method shipped with redux
const createStore = reducer => {
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = action => {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	};

	const subscribe = listener => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	};

	dispatch({});

	return { getState, dispatch, subscribe };
};

const store = createStore(counter);

const render = () => {
	document.body.innerText = store.getState();
};

store.subscribe(render);
render();

store.subscribe(() => {
	document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT' });
});
