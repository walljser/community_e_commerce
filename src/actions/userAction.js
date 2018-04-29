import {
  FETCH_USER,
  RECEIVE_USER
} from './types'
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

export {
  loadUser
}
