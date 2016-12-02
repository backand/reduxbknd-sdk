const fs = require('fs');
const os = require('os');

process.argv.slice(2).forEach(name => {

  var dir = name;
  var types = `./${name}/${name}Types.js`;
  var reducer = `./${name}/${name}Reducer.js`;
  var actions = `./${name}/${name}Actions.js`

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(types)) fs.writeFileSync(types, type_gen(name))
  if (!fs.existsSync(reducer)) fs.writeFileSync(reducer, reducer_gen(name))
  if (!fs.existsSync(actions)) fs.writeFileSync(actions, actions_gen(name))

});

function type_gen (name) {
  var upname = name.toUpperCase();
  return (
    `export const ${upname}_REQUEST = '${upname}_REQUEST';
export const ${upname}_RESOLVE = '${upname}_RESOLVE';
export const ${upname}_REJECT  = '${upname}_REJECT';

export const ADD_${upname}_RESOLVE = 'ADD_${upname}_RESOLVE';
export const ADD_${upname}_REJECT  = 'ADD_${upname}_REJECT';

export const UPDATE_${upname}_RESOLVE = 'UPDATE_${upname}_RESOLVE';
export const UPDATE_${upname}_REJECT  = 'UPDATE_${upname}_REJECT';

export const DELETE_${upname}_RESOLVE = 'DELETE_${upname}_RESOLVE';
export const DELETE_${upname}_REJECT  = 'DELETE_${upname}_REJECT';`
  )
}

function reducer_gen (name) {
  var upname = name.toUpperCase();
  return (
    `import { ${upname}_REQUEST, ${upname}_RESOLVE, ${upname}_REJECT,
  ADD_${upname}_RESOLVE, ADD_${upname}_REJECT,
  UPDATE_${upname}_RESOLVE, UPDATE_${upname}_REJECT,
  DELETE_${upname}_RESOLVE, DELETE_${upname}_REJECT } from './${name}Types';

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
    case ADD_${upname}_RESOLVE:
        return Object.assign({}, state, {
          data: [action.payload.data, ...state.data]
        });
  	case ADD_${upname}_REJECT:
        return Object.assign({}, state, {
          error: action.payload.error
        });
  	case UPDATE_${upname}_RESOLVE:
        return Object.assign({}, state, {
          data: [action.payload.data, ...state.data]
        });
  	case UPDATE_${upname}_REJECT:
        return Object.assign({}, state, {
          error: action.payload.error
        });
  	case DELETE_${upname}_RESOLVE:
  	    let newData = state.data.filter(item => item.id != action.payload.data.id);
        return Object.assign({}, state, {
          data: newData
        });
  	case DELETE_${upname}_REJECT:
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
  ADD_${upname}_RESOLVE, ADD_${upname}_REJECT,
  UPDATE_${upname}_RESOLVE, UPDATE_${upname}_REJECT,
  DELETE_${upname}_RESOLVE, DELETE_${upname}_REJECT } from './${name}Types';

export const get_${name} = (params = {}) => {
  return dispatch => {
    dispatch({
      type: ${upname}_REQUEST,
    })
    backand.service.getList('${name}', params,
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

export const add_${name} = (data, params = {}) => {
  return dispatch => {
    backand.service.create('${name}', data, Object.assign({}, params, {returnObject: true}),
      response => {
        dispatch({
          type: ADD_${upname}_RESOLVE,
          payload: {
            data: response.data
          }
        });
      },
      error => {
        dispatch({
          type: ADD_${upname}_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}

export const update_${name} = (id, data, params = {}) => {
  return dispatch => {
    backand.service.update('${name}', id, data, Object.assign({}, params, {returnObject: true}),
      response => {
        dispatch({
          type: UPDATE_${upname}_RESOLVE,
          payload: {
            data: response.data
          }
        });
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
    backand.service.remove('${name}', id,
      response => {
        dispatch({
          type: DELETE_${upname}_RESOLVE,
          payload: {
            data: {
      			  id
      			}
          }
        });
      },
      error => {
        dispatch({
          type: DELETE_${upname}_REJECT,
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
