import {
  FETCH_ADVS,
  FETCH_ADVS_SUCCESS,
  FETCH_ADVS_FAILURE
} from '../actions/types';

const initialAddress = {
  isFetching: false,
  advs: [],
  errorMessage: ''
}

export default (state = initialAddress, action = {}) => {
  switch (action.type) {
    case FETCH_ADVS:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: ''
      })
    case FETCH_ADVS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        advs: action.payload
      })
    case FETCH_ADVS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.payload
      })
    default:
      return state
  }
}
