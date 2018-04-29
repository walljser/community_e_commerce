import {
  SERVICE,
  SERVICE_SUCCESS,
  SERVICE_FAILURE,
  POSTING,
  POST_SUCCESS,
  POST_FAILURE
} from '../actions/types';

const initialState = {
  inService: false,
  errorMessage: "",
  postErrorMessage: "",
  posting: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVICE:
      return Object.assign({}, state, {
        errorMessage: "",
        inService: true
      })
    case SERVICE_SUCCESS:
      return Object.assign({}, state, {
        errorMessage: "",
        inService: false
      })
    case SERVICE_FAILURE:
      return Object.assign({}, state, {
        inService: false,
        errorMessage: action.payload
      })
    case POSTING:
      return Object.assign({}, state, {
        posting: true,
        postErrorMessage: ""
      })
    case POST_FAILURE:
      return Object.assign({}, state, {
        posting: false,
        postErrorMessage: action.payload
      })
    case POST_SUCCESS:
      return Object.assign({}, state, {
        posting: false,
        postErrorMessage: ""
      })
    default:
      return state
  }
}

