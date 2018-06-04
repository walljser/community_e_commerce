import {
  FETCH_ADVS,
  FETCH_ADVS_SUCCESS,
  FETCH_ADVS_FAILURE,
} from './types'
import {
  authError
} from './index';
import advService from '../services/advService';

function fetchAdvs() {
  return {
    type: FETCH_ADVS
  }
}

function fetchAdvsSuccess(data) {
  return {
    type: FETCH_ADVS_SUCCESS,
    payload: data
  }
}

function fetchAdvsFailure(msg) {
  return {
    type: FETCH_ADVS_FAILURE,
    payload: msg
  }
}

function getAllAdvs() {
  return async dispatch => {
    dispatch(fetchAdvs())
    try {
      const res = await advService.get()
      const user = res.data.data

      return dispatch(fetchAdvsSuccess(user))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }
    }
  }
}

export {
  getAllAdvs
}
