import { SIGNIN_REQUEST, SIGNIN_RESOLVE, SIGNIN_REJECT } from './authTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {loading: true};
    case AUTH_RESOLVE:
      return Object.assign(state, {
        loading: false,
        data: action.payload.data,
        loaded: true});
    case AUTH_REJECT:
      return Object.assign(state, {
        loading: false,
        error: action.payload.error,
        loaded: false});
    default:
      return state;
  }
}
