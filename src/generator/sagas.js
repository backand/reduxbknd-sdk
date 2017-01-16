import backand from 'vanillabknd-sdk'
import { take, takeEvery, takeLatest, put, call, fork, select, cancel, cancelled } from 'redux-saga/effects'

// add custom sagas here!

// generated sagas
export default function* rootSaga() {
  // register custom sagas for run() here!
  // Add the following line to the array below:
  // fork(CUSTOM_SAGA),
  yield [
    fork(objectRootSaga),
    fork(userRootSaga),
  ];
}

// object sagas
function* getSaga ({ payload }) {
  var upname = payload.name.toUpperCase();
  yield put({ type: `${upname}_REQUEST` })
  try {
    const response = yield call(backand.object.getList, payload.name, ...payload.args)
    yield put({
      type: `${upname}_RESOLVE`,
      payload: {
        data: response.data
      }
    })
  } catch (error) {
    yield put({
      type: `${upname}_REJECT`,
      payload: {
        error: error.data
      }
    });
  }
}

function* createSaga ({ payload }) {
  var upname = payload.name.toUpperCase();
  try {
    const response = yield call(backand.object.create, payload.name, ...payload.args)
    // SUCCESS CALLBACK: Write your code here!
    // Use the following type, and payload structure in case of using dispatch():
    // yield put({
    //   type: `CREATE_${upname}_RESOLVE`,
    //   payload: {
    //     data: DATA_TO_REDUCER
    //   }
    // });
  } catch (error) {
    yield put({
      type: `CREATE_${upname}_REJECT`,
      payload: {
        error: error.data
      }
    });
  }
}

function* updateSaga ({ payload }) {
  var upname = payload.name.toUpperCase();
  try {
    const response = yield call(backand.object.update, payload.name, ...payload.args)
    // SUCCESS CALLBACK: Write your code here!
    // Use the following type, and payload structure in case of using dispatch():
    // yield put({
    //   type: `UPDATE_${upname}_RESOLVE`,
    //   payload: {
    //     data: DATA_TO_REDUCER
    //   }
    // });
  } catch (error) {
    yield put({
      type: `UPDATE_${upname}_REJECT`,
      payload: {
        error: error.data
      }
    });
  }
}

function* removeSaga ({ payload }) {
  var upname = payload.name.toUpperCase();
  try {
    const response = yield call(backand.object.remove, payload.name, ...payload.args)
    // SUCCESS CALLBACK: Write your code here!
    // Use the following type, and payload structure in case of using dispatch():
    // yield put({
    //   type: `REMOVE_${upname}_RESOLVE`,
    //   payload: {
    //     data: DATA_TO_REDUCER
    //   }
    // });
  } catch (error) {
    yield put({
      type: `REMOVE_${upname}_REJECT`,
      payload: {
        error: error.data
      }
    });
  }
}

export function* objectRootSaga() {
  yield [
    fork(takeEvery, 'SAGA_GET_REQUEST'   , getSaga),
    fork(takeEvery, 'SAGA_CREATE_REQUEST', createSaga),
    fork(takeEvery, 'SAGA_UPDATE_REQUEST', updateSaga),
    fork(takeEvery, 'SAGA_REMOVE_REQUEST', removeSaga)
  ];
}

// user sagas
function* authorizeSaga ({ payload }) {
  yield put(request())
  try {
    let fn = backand[payload.fn] || backand.user[payload.fn]
    let response = yield call(fn, ...payload.args)
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
  yield put({ type: 'SIGNOUT' })
}

export function* userRootSaga () {
  while (true) {
    let action = yield take('SAGA_SIGNIN_REQUEST')
    const task = yield fork(authorizeSaga, action)
    action = yield take(['SAGA_SIGNOUT', 'SIGNIN_REJECT'])
    if (action.type === 'SIGNIN_REJECT') {
      continue;
    }
    if (action.type === 'SAGA_SIGNOUT') {
      yield fork(signoutSaga)
      yield cancel(task)
    }
  }
}

const request = () => {
  return {
    type: 'SIGNIN_REQUEST',
  }
}
const resolve = (data) => {
  return {
    type: 'SIGNIN_RESOLVE',
    payload: {
      data
    }
  }
}
const reject = (error) => {
  return {
    type: 'SIGNIN_REJECT',
    payload: {
      error
    }
  }
}
