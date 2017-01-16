module.exports = function actions_gen (name) {
  var upname = name.toUpperCase();
  var camel  = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
  return (
    `import { ${upname}_REQUEST, ${upname}_RESOLVE, ${upname}_REJECT,
  CREATE_${upname}_RESOLVE, CREATE_${upname}_REJECT,
  UPDATE_${upname}_RESOLVE, UPDATE_${upname}_REJECT,
  REMOVE_${upname}_RESOLVE, REMOVE_${upname}_REJECT } from './${name}Types'
import backand from 'vanillabknd-sdk'

// add custom actions here!

// generated actions
export const get${camel} = (params = {}) => {
  return {
    type: 'SAGA_GET_REQUEST',
    payload: {
      name: '${name}',
      args: [
        params,
      ],
    },
  }
}

export const create${camel} = (data, params = {}) => {
  return {
    type: 'SAGA_CREATE_REQUEST',
    payload: {
      name: '${name}',
      args: [
        data,
        params,
      ],
    },
  }
}

export const update${camel} = (id, data, params = {}) => {
  return {
    type: 'SAGA_UPDATE_REQUEST',
    payload: {
      name: '${name}',
      args: [
        id,
        data,
        params,
      ],
    },
  }
}

export const remove${camel} = (id) => {
  return {
    type: 'SAGA_REMOVE_REQUEST',
    payload: {
      name: '${name}',
      args: [
        id,
      ],
    },
  }
}
`)
}
