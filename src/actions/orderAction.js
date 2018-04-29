import {
  FETCH_ORDERS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_SUCCESS
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
  return{
    type: FETCH_ORDERS_FAILURE,
    payload: errorMessage
  }
}

function getOrdersByUserId(userId, token) {
  return async (dispatch) => {
    try {
      dispatch(fetchOrders())
      const res = await orderService.getByUserId(userId, token)
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

export {
  getOrdersByUserId
}
