import {
  FETCH_ORDERS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_SUCCESS
} from '../actions/types';

const initialState = {
  isFetching: false,
  errorMessage: '',
  orders: []
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
    default:
      return state
  }
}
