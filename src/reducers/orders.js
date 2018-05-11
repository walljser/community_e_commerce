import {
  FETCH_ORDERS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_SUCCESS,
  POST_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILURE,
} from '../actions/types';

const initialState = {
  isFetching: false,
  errorMessage: '',
  orders: [],
  isPosting: false,
  postError: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ORDERS: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }
    case FETCH_ORDERS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.payload
      })
    }
    case FETCH_ORDERS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        orders: action.payload
      })
    }
    case POST_ORDER: {
      return Object.assign({}, state, {
        isPosting: true,
        postError: ''
      })
    }
    case POST_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        isPosting: false
      })
    }
    case POST_ORDER_FAILURE: {
      return Object.assign({}, state, {
        isPosting: false,
        postError: action.payload
      })
    }
    default:
      return state
  }
}
