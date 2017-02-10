reduxbknd-sdk
===
###**NOTE - This SDK is deprecated, please use our new SDK at https://github.com/backand/vanilla-sdk**

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
- Download [redux-thunk](https://github.com/gaearon/redux-thunk) and include it in [createStore()](http://redux.js.org/docs/api/createStore.html):
```javascript
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

createStore(rootReducer, initialState, applyMiddleware(thunk))
```
- Use `npm run generate OBJ` to generate `Types`,`Actions`,`Reducers` for your Backand objects:
```bash
$ cd ./node_modules/reduxbknd-sdk/
$ npm run generate obj1 obj2 obj3... (CREATE OBJECTS)
$ npm run generate mode=del obj1 obj2 obj3... (DELETE OBJECTS)
```  
- Include `Reducers` in [combineReducers()](http://redux.js.org/docs/api/combineReducers.html):
```javascript
import { combineReducers } from 'redux'
import user from './node_modules/reduxbknd-sdk/src/auth/authReducer'
import obj1 from './node_modules/reduxbknd-sdk/src/obj1/obj1Reducer'
import obj2 from './node_modules/reduxbknd-sdk/src/obj2/obj2Reducer'

combineReducers({
  user,
  obj1,
  obj2
})
```
- Import `Actions` and dispatch them happily! :smile:
```javascript
import { getUserDetails, signin, useAnonymousAuth, signout } from './node_modules/reduxbknd-sdk/src/auth/authActions'

store.dispatch(signin(username, password))
store.dispatch(getUserDetails())
```


## Examples
- [codepen example](http://codepen.io/rannn505/pen/JbLEKV)
- [react-native-example](https://github.com/backand/react-native-example/tree/sdk)


## License

  [MIT](LICENSE)
