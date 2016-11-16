import { SIGNIN_REQUEST, SIGNIN_RESOLVE, SIGNIN_REJECT } from './authTypes';

export const useAnonymousAuth = () => {
  return dispatch => {
    backand.service.useAnonymousAuth(response => {
      dispatch(resolve({
        backand.service.storage.user;
      });
    })
  }
}

export const signin = ({username, password}) => {
  return dispatch => {
    dispatch(request())
    backand.service.signin(username, password,
      response => {
        dispatch(resolve({
          backand.service.storage.user;
        });
      },
      error => {
        dispatch(reject(error.data.error_description));
      });
  };
}

const request = () => {
  return {
    type: SIGNIN_REQUEST,
  }
}

const resolve = (data) => {
  return {
    type: SIGNIN_RESOLVE,
    payload: {
      data
    }
  }
}

const reject = (error) => {
  return {
    type: SIGNIN_REJECT,
    payload: {
      error
    }
  }
}
