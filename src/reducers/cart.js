import {
  GET_CART_GOOD_DETAIL,
  RECEIVE_ONE_CART,
  FETCH_CART_DETAIL_FAILURE,
  FETCH_CART,
  RECEIVE_CART,
  FETCH_CART_FAILURE,
  POST_CART,
  POST_CART_SUCCESS,
  POST_CART_FAILURE
} from '../actions/types';

const initialState = {
  cartDetail: {},
  cart: {},
  receiveAt: 0,
  isFetchingCart: false,
  isFetchingCartDetail: false,
  isPostingCart: false,
  postCartError: ""
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CART_GOOD_DETAIL:
      return Object.assign({}, state, {
        cartDetail: {},
        isFetchingCartDetail: true
      })
    case RECEIVE_ONE_CART:
      return Object.assign({}, state, {
        cartDetail: action.payload,
        isFetchingCartDetail: false
      })
    case FETCH_CART_DETAIL_FAILURE:
      return Object.assign({}, state, {
        isFetchingCartDetail: false
      })
    case FETCH_CART:
      return Object.assign({}, state, {
        isFetchingCart: true,
        cart: {}
      })
    case RECEIVE_CART:
      return Object.assign({}, state, {
        isFetchingCart: false,
        cart: action.cart,
        receiveAt: action.receiveAt
      })
    case FETCH_CART_FAILURE:
      return Object.assign({}, state, {
        isFetchingCart: false
      })
    case POST_CART:
      return Object.assign({}, state, {
        isPostingCart: true,
        postCartError: ""
      })
    case POST_CART_SUCCESS:
      return Object.assign({}, state, {
        isPostingCart: false
      })
    case POST_CART_FAILURE:
      return Object.assign({}, state, {
        isPostingCart: false,
        postCartError: action.payload
      })
    default:
      return state
  }
}
