reduxbknd-sdk
===

>  Backand SDK for [Redux](http://redux.js.org/)
This SDK enables you to communicate comfortably and quickly with your Backand app.
It wraps the [vanillabknd-sdk](https://github.com/backand/vanillabknd-sdk) to allow easier work on projects involving Redux.


## Installation
- Download/Clone this repo and include the files in your project tree.
- Download [vanillabknd-sdk](https://github.com/backand/vanillabknd-sdk) and include it in your project
``` html
<script src="backand.js"></script>
```
- Download [redux-thunk](https://github.com/gaearon/redux-thunk) and include it in [createStore()](http://redux.js.org/docs/api/createStore.html):
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

createStore(rootReducer, initialState, applyMiddleware(thunk));
```
- Use `object_generator.js` to generate `Types`,`Actions`,`Reducers` for your Backand objects:
```bash
    $ node object_generator.js obj1 obj2 obj3...
```  
- Include `Reducers` in [combineReducers()](http://redux.js.org/docs/api/combineReducers.html):
```javascript
import { combineReducers } from 'redux';
import user from './authentication/authReducer'
import obj1 from './obj1/obj1Reducer'
import obj2 from './obj1/obj1Reducer'

combineReducers({
  user,
  obj1,
  obj2
})
```
- Start dispatching actions and ENJOY! :smile:

## License

  [MIT](LICENSE)
