import {
  FETCH_USER,
  RECEIVE_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions/types'

const initialState = {
  isFetching: false,
  user: {},
  errorMessage: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user
      })
    case UPDATE_USER:
      return Object.assign({}, state, {
        errorMessage: ''
      })
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload
      })
    case UPDATE_USER_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.payload
      })
    default:
      return state
  }
}
