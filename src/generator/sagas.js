import backand from 'vanillabknd-sdk'
import { take, takeEvery, call, put, select, fork, cancel } from 'redux-saga/effects'

// objectSagas
function* getSaga ({ payload }) {
  var upname = payload.name.toUpperCase();
  yield put({ type: `${upname}_REQUEST` })
  try {
    const response = yield call(backand.object.getList, payload.name, ...payload.args)
    yield put({
      type: `${upname}_RESOLVE`,
      payload: {
        data: response.data.data
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
