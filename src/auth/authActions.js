import { SIGNIN_REQUEST, SIGNIN_RESOLVE, SIGNIN_REJECT, SIGNOUT } from './authTypes'
import backand from 'vanillabknd-sdk'

export const getUserDetails = (force) => {
  return dispatch => {
    dispatch(request());
    backand.getUserDetails(response => {
      dispatch(resolve(response.data));
    },
    error => {
      dispatch(reject(error.data));
    }, force);
  };
}

export const useAnonymousAuth = () => {
  return dispatch => {
    backand.useAnonymousAuth(response => {
      dispatch(resolve(response.data));
    });
  };
}

export const signin = (username, password) => {
  return dispatch => {
    dispatch(request());
    backand.signin(username, password,
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
    dispatch(request());
    backand.socialSignin(provider,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}

export const socialSigninWithToken = (provider, token) => {
  return dispatch => {
    dispatch(request());
    backand.socialSigninWithToken(provider, token,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}

export const signup = (email, password, confirmPassword, firstName, lastName, parameters) => {
  return dispatch => {
    dispatch(request());
    backand.signup(email, password, confirmPassword, firstName, lastName, parameters,
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
    backand.signout(response => {
      dispatch({type: SIGNOUT});
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
