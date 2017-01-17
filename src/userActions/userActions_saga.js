import { SIGNIN_REQUEST, SIGNIN_RESOLVE, SIGNIN_REJECT, SIGNOUT } from './userTypes'
import backand from 'vanillabknd-sdk'

// add custom actions here!

// generated actions
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

export const signup = (firstName, lastName, email, password, confirmPassword, parameters) => {
  if (!backand.defaults.runSigninAfterSignup) {
      throw new Error(`runSigninAfterSignup is false but you wish to make changes to the store.
        For the sake of maintaining the consistent of your store, either
        Change runSigninAfterSignup to true, or
        use the function as is from the "vanillabknd-sdk"`);
  }
  return toSaga({
    fn: 'signup',
    args: [
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
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
