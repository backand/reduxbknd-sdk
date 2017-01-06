module.exports = function reducer_gen (name) {
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
