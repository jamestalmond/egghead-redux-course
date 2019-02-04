# Notes

## The first principle of Redux

Everything that changes in your application, including the data and the UI state, is contained in a single object, we call the state or the state tree.

## The second principle of Redux

The state is read only. The only way to change the state tree is by dispatching an action.

An action is a plain JavaScript object, describing in the minimal way what changed in the application. Whether it is initiated by a network request or by user interaction, any data that gets into the Redux application gets there by actions.

## Pure and impure functions

```js
// Pure functions
function square(x) {
	return x * x;
}

function squareAll(items) {
	return items.map(square);
}

// Impure functions
function square(x) {
	updateXInDatabase(x);
	return x * x;
}

function squareAll(items) {
	for (let i = 0; i < items.length; i++) {
		items[i] = square(items[i]);
	}
}
```

Pure functions do not have any observable side effects, such as network or database calls. The pure functions just calculate the new value. You can be confident that if you call the pure function with the same set of arguments, you're going to get the same returned value. They are predictable.

Also, pure functions do not modify the values passed to them. For example, `squareAll` function that accepts an array does not overwrite the `items` inside this array. Instead, it returns a new array by using `items.map`.

Impure functions may call the database or the network, they may have side effects, they may operate on the DOM, and they may override the values that you pass to them.

## The third and the last principle of Redux

To describe state mutations, you have to write a function that takes the previous state of the app, the action being dispatched, and returns the next state of the app. This function has to be pure.

This function is called the Reducer.
