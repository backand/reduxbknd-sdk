const fs = require('fs');
const os = require('os');

var params  = process.argv.slice(2);
var mode    = 'ins';
var index   = './../index.js';

if (params.indexOf('mode=del') !== -1) {
  mode = 'del';
  params.splice(params.indexOf('mode=del'), 1);
}
if (params.indexOf('mode=ins') !== -1) {
  mode = 'ins';
  params.splice(params.indexOf('mode=ins'), 1);
}
console.log('mode: ' + mode);
console.log(params);
if (params.indexOf('auth') !== -1) {
  console.log('auth can not modified');
  params.splice(params.indexOf('auth'), 1);
}

if (mode === 'del') {
  params.forEach(name => {

    var dir = name;
    var types   = `${dir}/${name}Types.js`;
    var reducer = `${dir}/${name}Reducer.js`;
    var actions = `${dir}/${name}Actions.js`;

    if (fs.readFileSync(index).toString().indexOf(`${name}Actions`) === -1) {
      console.log(`Object ${name} not exists`)
    }
    else {
      if (fs.existsSync(types)) fs.unlinkSync(types);
      if (fs.existsSync(reducer)) fs.unlinkSync(reducer);
      if (fs.existsSync(actions)) fs.unlinkSync(actions);
      fs.rmdirSync(dir);
      var indexTxt = fs.readFileSync(index).toString().split(os.EOL);
      indexTxt.splice(indexTxt.indexOf(`export * from './src/${dir}/${name}Actions'`), 2);

      fs.writeFileSync(index, '');
      fs.writeFileSync(index, indexTxt.join(os.EOL));
      console.log(`Object ${name} has been deleted`);
    }
  })
  return;
}

params.forEach(name => {

  var dir     = name;
  var types   = `${dir}/${name}Types.js`;
  var reducer = `${dir}/${name}Reducer.js`;
  var actions = `${dir}/${name}Actions.js`;

  if (fs.readFileSync(index).toString().indexOf(`${name}Actions`) !== -1) {
    console.log(`Object ${name} already exists`);
  }
  else {
    fs.mkdirSync(dir);
    fs.writeFileSync(types, types_gen(name));
    fs.writeFileSync(reducer, reducer_gen(name));
    fs.writeFileSync(actions, actions_gen(name));
    fs.appendFileSync(index, `${os.EOL}export * from './src/${dir}/${name}Actions'`);
    fs.appendFileSync(index, `${os.EOL}export { default as ${name} } from './src/${dir}/${name}Reducer'`);
    console.log(`Object ${name} has been created`);
  }

});

function types_gen (name) {
  var upname = name.toUpperCase();
  return (
    `export const ${upname}_REQUEST = '${upname}_REQUEST';
export const ${upname}_RESOLVE = '${upname}_RESOLVE';
export const ${upname}_REJECT  = '${upname}_REJECT';

export const CREATE_${upname}_RESOLVE = 'CREATE_${upname}_RESOLVE';
export const CREATE_${upname}_REJECT  = 'CREATE_${upname}_REJECT';

export const UPDATE_${upname}_RESOLVE = 'UPDATE_${upname}_RESOLVE';
export const UPDATE_${upname}_REJECT  = 'UPDATE_${upname}_REJECT';

export const REMOVE_${upname}_RESOLVE = 'REMOVE_${upname}_RESOLVE';
export const REMOVE_${upname}_REJECT  = 'REMOVE_${upname}_REJECT';`
  )
}

function reducer_gen (name) {
  var upname = name.toUpperCase();
  return (
    `import { ${upname}_REQUEST, ${upname}_RESOLVE, ${upname}_REJECT,
  CREATE_${upname}_RESOLVE, CREATE_${upname}_REJECT,
  UPDATE_${upname}_RESOLVE, UPDATE_${upname}_REJECT,
  REMOVE_${upname}_RESOLVE, REMOVE_${upname}_REJECT } from './${name}Types'

export default (state = {}, action) => {
  switch (action.type) {
    case ${upname}_REQUEST:
      return {loading: true};
    case ${upname}_RESOLVE:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload.data,
        loaded: true
      });
    case ${upname}_REJECT:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
        loaded: false
      });
    case CREATE_${upname}_RESOLVE:
      // Write your code here!
      // Use action.payload to access data
      // EXAMPLE:
      // return Object.assign({}, state, {
      //   data: [action.payload.data, ...state.data]
      // });
  	case CREATE_${upname}_REJECT:
      return Object.assign({}, state, {
        error: action.payload.error
      });
  	case UPDATE_${upname}_RESOLVE:
      // Write your code here!
      // Use action.payload to access data
      // EXAMPLE:
      // return Object.assign({}, state, {
      //   data: [action.payload.data, ...state.data]
      // });
  	case UPDATE_${upname}_REJECT:
      return Object.assign({}, state, {
        error: action.payload.error
      });
  	case REMOVE_${upname}_RESOLVE:
      // Write your code here!
      // Use action.payload to access data
      // EXAMPLE:
	    // let newData = state.data.filter(item => item.id != action.payload.data.id);
      // return Object.assign({}, state, {
      //   data: newData
      // });
  	case REMOVE_${upname}_REJECT:
        return Object.assign({}, state, {
          error: action.payload.error
        });
    default:
      return state;
  }
}
`
  )
}

function actions_gen (name) {
  var upname = name.toUpperCase();
  return (
    `import { ${upname}_REQUEST, ${upname}_RESOLVE, ${upname}_REJECT,
  CREATE_${upname}_RESOLVE, CREATE_${upname}_REJECT,
  UPDATE_${upname}_RESOLVE, UPDATE_${upname}_REJECT,
  REMOVE_${upname}_RESOLVE, REMOVE_${upname}_REJECT } from './${name}Types'
import backand from 'vanillabknd-sdk'

// add custom actions here!

// generated actions
export const get_${name} = (params = {}) => {
  return dispatch => {
    dispatch({
      type: ${upname}_REQUEST,
    })
    backand.getList('${name}', params,
      response => {
        dispatch({
          type: ${upname}_RESOLVE,
          payload: {
            data: response.data.data
          }
        });
      },
      error => {
        dispatch({
          type: ${upname}_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}

export const create_${name} = (data, params = {}) => {
  return dispatch => {
    backand.create('${name}', data, params,
      response => {
        // SUCCESS CALLBACK: Write your code here!
        // Use the following type, and payload structure in case of using dispatch():
        // dispatch({
        //   type: CREATE_${upname}_RESOLVE,
        //   payload: {
        //     data: DATA_TO_REDUCER
        //   }
        // });
      },
      error => {
        dispatch({
          type: CREATE_${upname}_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}

export const update_${name} = (id, data, params = {}) => {
  return dispatch => {
    backand.update('${name}', id, data, params,
      response => {
        // SUCCESS CALLBACK: Write your code here!
        // Use the following type, and payload structure in case of using dispatch():
        // dispatch({
        //   type: UPDATE_${upname}_RESOLVE,
        //   payload: {
        //     data: DATA_TO_REDUCER
        //   }
        // });
      },
      error => {
        dispatch({
          type: UPDATE_${upname}_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}

export const remove_${name} = (id) => {
  return dispatch => {
    backand.remove('${name}', id,
      response => {
        // SUCCESS CALLBACK: Write your code here!
        // Use the following type, and payload structure in case of using dispatch():
        // dispatch({
        //   type: REMOVE_${upname}_RESOLVE,
        //   payload: {
        //     data: DATA_TO_REDUCER
        //   }
        // });
      },
      error => {
        dispatch({
          type: REMOVE_${upname}_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}
`
  )
}
