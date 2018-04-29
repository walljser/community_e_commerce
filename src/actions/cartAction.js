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
} from './types'
import {
  authError,
  service,
  serviceSuccess,
  serviceFailure,
  posting,
  postSuccess,
  postFailure
} from './index';
import cartService from '../services/cartService';

function getCartGoodDetail() {
  return {
    type: GET_CART_GOOD_DETAIL
  }
}

function receiveOneCart(cartDetail) {
  return {
    type: RECEIVE_ONE_CART,
    payload: cartDetail
  }
}

function fetchCartDetailFailure(message) {
  return {
    type: FETCH_CART_DETAIL_FAILURE,
    payload: message
  }
}

function fetchCart() {
  return {
    type: FETCH_CART
  }
}

function receiveCart(cart) {
  return {
    type: RECEIVE_CART,
    receiveAt: new Date().getTime(),
    cart
  }
}

function fetchCartFailure(message) {
  return{
    type: FETCH_CART_FAILURE,
    payload: message
  }
}

function postCart() {
  return {
    type: POST_CART
  }
}

function postCartSuccess() {
  return {
    type: POST_CART_SUCCESS
  }
}

function postCartFailure(message) {
  return {
    type: POST_CART_FAILURE,
    payload: message
  }
}

function getCart(userId) {
  return async dispatch => {
    dispatch(fetchCart())
    try {
      const res = await cartService.getCart(userId)
      const cart = res.data.data
      // console.log(cart)
      dispatch(receiveCart(cart))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = "服务器睡着了，请稍后再试"
        return dispatch(fetchCartFailure(errorMessage))
      }
      if (err.response.status === 404) {
        const errorMessage = err.response.data.message
        return dispatch(fetchCartFailure(errorMessage))
      }
    }
  }
}

/**
 * 根据goodId 获取用户购物车中一件商品的详细信息
 *
 * @param {any} userId
 * @param {any} token
 * @param {any} goodId
 * @returns
 */
function getCartByGoodId(userId, token, goodId) {
  return async dispatch => {
    dispatch(getCartGoodDetail())
    try {
      const res = await cartService.getDetailByGoodId(userId, token, goodId)
      return dispatch(receiveOneCart(res.data.data))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = "服务器睡着了，请稍后再试"
        return dispatch(fetchCartDetailFailure(errorMessage))
      }
      if (err.response.status === 404) {
        const errorMessage = err.response.data.message
        return dispatch(fetchCartDetailFailure(errorMessage))
      }
    }
  }
}

function addGoodToCart(userId, token, goodId, count) {
  return async dispatch => {
    dispatch(posting())
    try {
      const res = await cartService.post(userId, token, goodId, count)
      return dispatch(postSuccess())
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(postFailure(errorMessage))
      }

      if (err.response.status === 400) {
        const errorMessage = err.response.data.message
        return dispatch(postFailure(errorMessage))
      }

      // un authorized
      if (err.response.status === 401) {
        const errorMessage = err.response.data.message
        dispatch(postFailure(errorMessage))
        return dispatch(authError(errorMessage))
      }
    }
  }
}

export {
  getCartByGoodId,
  addGoodToCart,
  getCart
}
