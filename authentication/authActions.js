import { SIGNIN_REQUEST, SIGNIN_RESOLVE, SIGNIN_REJECT } from './authTypes';

export const useAnonymousAuth = () => {
  return dispatch => {
    backand.service.useAnonymousAuth(response => {
      dispatch(resolve(response.data));
    })
  }
}

export const signin = ({username, password}) => {
  return dispatch => {
    dispatch(request())
    backand.service.signin(username, password,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}

export const signup = ({email, password, confirmPassword, firstName, lastName}) => {
  return dispatch => {
    dispatch(request())
    backand.service.signup(email, password, confirmPassword, firstName, lastName,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}

export const socialSignin = (provider) => {
  return dispatch => {
    dispatch(request())
    backand.service.socialSignin(provider,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}

export const signout = () => {
  return dispatch => {
    backand.service.signout(response => {
      dispatch(resolve(response.data));
    })
  }
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
