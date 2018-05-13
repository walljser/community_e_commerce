import {
  FETCH_ORDERS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_SUCCESS,
  POST_ORDER,
  POST_ORDER_FAILURE,
  POST_ORDER_SUCCESS
} from './types';
import {
  authError
} from './index';
import orderService from '../services/orderService';

function fetchOrders() {
  return {
    type: FETCH_ORDERS
  }
}

function fetchOrdersSuccess(data) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: data
  }
}

function fetchOrdersFailure(errorMessage) {
  return {
    type: FETCH_ORDERS_FAILURE,
    payload: errorMessage
  }
}

function postOrder() {
  return {
    type: POST_ORDER
  }
}

function postOrderSuccess() {
  return {
    type: POST_ORDER_SUCCESS
  }
}

function postOrderFailure(message) {
  return {
    type: POST_ORDER_FAILURE,
    payload: message
  }
}

function getOrdersByUserId(userId, token, status) {
  return async (dispatch) => {
    try {
      dispatch(fetchOrders())
      const res = await orderService.getByUserId(userId, token, status)
      const data = res.data.data
      return dispatch(fetchOrdersSuccess(data))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 401) {
        const errorMessage = err.response.data.message
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 400) {
        const errorMessage = err.response.data.message
        return dispatch(fetchOrdersFailure(errorMessage))
      }
    }
  }
}

function createOrder(userId, token, addressId, remarks, cartDetailIds) {
  return async dispatch => {
    try {
      dispatch(postOrder())
      const res = await orderService.create(userId, token, addressId, remarks, cartDetailIds)
      return dispatch(postOrderSuccess())
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 401) {
        const errorMessage = err.response.data.message
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 400 || err.response.status === 404) {
        const errorMessage = err.response.data.message
        return dispatch(postOrderFailure(errorMessage))
      }
    }
  }
}

export {
  getOrdersByUserId,
  createOrder
}
