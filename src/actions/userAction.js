import {
  FETCH_USER,
  RECEIVE_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from './types'
import {
  authError
} from './index';
import userService from '../services/userService';

function fetchUser() {
  return {
    type: FETCH_USER
  }
}

function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user
  }
}

function updateUser() {
  return {
    type: UPDATE_USER
  }
}

function updateUserSuccess(data) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data
  }
}

function updateUserFailure(msg) {
  return {
    type: UPDATE_USER_FAILURE,
    payload: msg
  }
}

function loadUser(userId, token) {
  return async dispatch => {
    dispatch(fetchUser())
    try {
      const res = await userService.get(userId, token)
      const user = res.data.data

      return dispatch(receiveUser(user))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 404 && err.response.data.code === -1001) {
        const errorMessage = err.response.data.message
        return dispatch(authError(errorMessage))
      }
    }
  }
}

function editUserInfo(userId, token, user) {
  return async dispatch => {
    dispatch(updateUser())
    try {
      const res = await userService.patch(userId, token, user)
      console.log(3333)
      const data = res.data.data
      console.log(4444)

      return dispatch(updateUserSuccess(data))
    } catch (err) {
      console.log(5555)
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.data.code === -1005) {
        const errorMessage = err.response.data.message
        return dispatch(updateUserFailure(errorMessage))
      }
    }
  }
}

export {
  loadUser,
  editUserInfo
}
