reduxbknd-sdk
===
[![npm version](https://img.shields.io/npm/v/reduxbknd-sdk.svg?style=flat-square)](https://www.npmjs.org/package/reduxbknd-sdk)
[![npm downloads](https://img.shields.io/npm/dt/reduxbknd-sdk.svg?style=flat-square)](http://npm-stat.com/charts.html?package=reduxbknd-sdk)

>  Backand SDK for [Redux](http://redux.js.org/).
This SDK enables you to communicate comfortably and quickly with your Backand app.
It wraps the [vanillabknd-sdk](https://github.com/backand/vanillabknd-sdk) to allow easier work on projects involving Redux.


## Installation
- NPM:
```bash
$ npm i -S reduxbknd-sdk
```
- Use `reduxbknd` to generate `Types`,`Actions`,`Reducers` for your Backand objects:
```bash
$ ./node_modules/.bin/reduxbknd --help
$ ./node_modules/.bin/reduxbknd user obj1 obj2 obj3... -m (thunk/saga)
```  
***note:*** user is a unique object. It has a different `Reducer` and `Types`, and it reveals most of the authentication `Actions` (getUserDetails, signin, signout...).
- Include `Reducers` in [combineReducers()](http://redux.js.org/docs/api/combineReducers.html):
```javascript
import { combineReducers } from 'redux'
import user from './user/userReducer'
import obj1 from './obj1/obj1Reducer'
import obj2 from './obj2/obj2Reducer'

combineReducers({
  user,
  obj1,
  obj2
})
```
- For the middleware (thunk/saga) you are using, follow the corresponding instructions:

### [redux-thunk](https://github.com/gaearon/redux-thunk)
Download [redux-thunk](https://github.com/gaearon/redux-thunk) and include it in [createStore()](http://redux.js.org/docs/api/createStore.html):
```javascript
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

createStore(rootReducer, initialState, applyMiddleware(thunk))
```
### [redux-saga](https://github.com/redux-saga/redux-saga)
Download [redux-saga](https://github.com/redux-saga/redux-saga) and include it in [createStore()](http://redux.js.org/docs/api/createStore.html):
```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas.js'

const sagaMiddleware = createSagaMiddleware()
createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
```
- Import `Actions` and dispatch them happily! :smile:
```javascript
import { getUserDetails, signin, useAnonymousAuth, signout } from './user/userActions'

store.dispatch(signin(username, password))
store.dispatch(getUserDetails())
```


## Examples
- [codepen example (thunk)](http://codepen.io/backand/pen/VmRajE)
- [codepen example (saga)](http://codepen.io/backand/pen/pRgqyx)
- [react-native-example](https://github.com/backand/react-native-example/tree/sdk)


## License

  [MIT](LICENSE)
