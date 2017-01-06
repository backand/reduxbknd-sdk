import { SIGNIN_REQUEST, SIGNIN_RESOLVE, SIGNIN_REJECT, SIGNOUT } from './userTypes'
import backand from 'vanillabknd-sdk'
import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'

// userSagas
function* authorizeSaga ({ payload }) {
  yield put(request())
  try {
    let response = yield call(backand[payload.fn], ...payload.args)
    yield put(resolve(response.data))
  } catch(error) {
    yield put(reject(error.data))
  } finally {
    if (yield cancelled()) { }
  }
}

function* signoutSaga () {
  yield put(request())
  let response = yield call(backand.signout)
  yield put({ type: SIGNOUT })
}

export function* userRootSaga () {
  while (true) {
    let action = yield take('SAGA_SIGNIN_REQUEST')
    // fork return a Task object
    const task = yield fork(authorizeSaga, action)
    action = yield take(['SAGA_SIGNOUT', SIGNIN_REJECT])
    yield fork(signoutSaga)
    if (action.type === 'SAGA_SIGNOUT') {
      yield cancel(task)
    }
  }
}

// actions
export const getUserDetails = (force) => {
  return toSaga({
    fn: 'getUserDetails',
    args: [
      force
    ],
  })
}

export const useAnonymousAuth = () => {
  return toSaga({
    fn: 'useAnonymousAuth',
    args: [ ],
  })
}

export const signin = (username, password) => {
  return toSaga({
    fn: 'signin',
    args: [
      username,
      password
    ],
  })
}

export const socialSignin = (provider) => {
  return toSaga({
    fn: 'socialSignin',
    args: [
      provider
    ],
  })
}

export const socialSigninWithToken = (provider, token) => {
  return toSaga({
    fn: 'socialSigninWithToken',
    args: [
      provider,
      token
    ],
  })
}

export const signup = (email, password, confirmPassword, firstName, lastName, parameters) => {
  if (!backand.defaults.runSigninAfterSignup) {
      throw new Error(`runSigninAfterSignup is false but you wish to make changes to the store.
        For the sake of maintaining the consistent of your store, either
        Change runSigninAfterSignup to true, or
        use the function as is from the "vanillabknd-sdk"`);
  }
  return toSaga({
    fn: 'signup',
    args: [
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      parameters,
    ],
  })
}

export const signout = () => {
  return {
    type: 'SAGA_SIGNOUT'
  }
}


const toSaga = (payload) => {
  return {
    type: 'SAGA_SIGNIN_REQUEST',
    payload,
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
