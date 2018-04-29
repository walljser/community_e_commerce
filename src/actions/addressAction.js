import { FETCH_ADDRESSES, RECEIVE_ADDRESSES, POST_ADDRESS, FETCH_ONE_ADDRESS, RECEIVE_ONE_ADDRESS, FETCH_ADDRESSES_FAILURE, FETCH_ONE_ADDRESS_FAILURE, POST_ADDRESS_FAILURE, POST_ADDRESS_SUCCESS } from "../actions/types";
import {
  authError, service, serviceFailure, serviceSuccess
} from './index';
import addressService from '../services/addressService';

function fetchAddresses() {
  return {
    type: FETCH_ADDRESSES
  }
}

function receiveAddresses(addresses) {
  return {
    type: RECEIVE_ADDRESSES,
    payload: addresses
  }
}

function fetchAddressesFailure(message) {
  return {
    type: FETCH_ADDRESSES_FAILURE,
    payload: message
  }
}

function fetchOneAddress() {
  return {
    type: FETCH_ONE_ADDRESS
  }
}

function receiveOneAddress(address) {
  return {
    type: RECEIVE_ONE_ADDRESS,
    payload: address
  }
}

function fetchOneAddressFailure(message) {
  return {
    type: FETCH_ONE_ADDRESS_FAILURE,
    payload: message
  }
}

function postAddress() {
  return {
    type: POST_ADDRESS
  }
}

function postAddressSuccess() {
  return {
    type: POST_ADDRESS_SUCCESS
  }
}

function postAddressFailure(message) {
  return {
    type: POST_ADDRESS_FAILURE,
    payload: message
  }
}

/**
 * 获取用户的全部地址信息
 *
 * @param {any} userId
 * @param {any} token
 * @returns
 */
function loadAllAddesses(userId, token) {
  return async dispatch => {
    dispatch(fetchAddresses())
    try {
      const res = await addressService.all(userId, token)
      const addresses = res.data.data
      return dispatch(receiveAddresses(addresses))
    } catch (err) {
      let errorMessage
      if (err.response === undefined) {
        errorMessage = '服务器睡着了，请稍后再试'
      }

      if (err.response.status === 400) {
        errorMessage = err.response.data.message
      }

      if (err.response.status === 401) {
        errorMessage = err.response.data.message
        dispatch(fetchAddressesFailure(errorMessage))
        return dispatch(authError(errorMessage))
      }

      return dispatch(fetchAddressesFailure(errorMessage))
    }
  }
}

/**
 * 根据地址id获取用户的一条地址信息
 *
 * @param {any} userId
 * @param {any} token
 * @param {any} addressId
 * @returns
 */
function getAddress(userId, token, addressId) {
  return async dispatch => {
    dispatch(fetchOneAddress())
    try {
      const res = await addressService.one(userId, token, addressId)
      const address = res.data.data
      return dispatch(receiveOneAddress(address))
    } catch (err) {
      let errorMessage
      if (err.response === undefined) {
        errorMessage = '服务器睡着了，请稍后再试'
      }

      if (err.response.status === 400) {
        errorMessage = err.response.data.message
      }

      if (err.response.status === 401) {
        errorMessage = err.response.data.message
        dispatch(fetchOneAddressFailure(errorMessage))
        return dispatch(authError(errorMessage))
      }

      return dispatch(fetchOneAddressFailure(errorMessage))
    }
  }
}

/**
 * 创建一条新的地址信息
 *
 * @param {any} userId
 * @param {any} token
 * @param {any} address
 * @returns
 */
function createAddress(userId, token, address) {
  return async dispatch => {
    dispatch(postAddress())
    try {
      const res = await addressService.create(userId, token, address)
      return dispatch(postAddressSuccess())
    } catch (err) {
      let errorMessage
      if (err.response === undefined) {
        errorMessage = '服务器睡着了，请稍后再试'
      }

      if (err.response.status === 400) {
        errorMessage = err.response.data.message
      }

      if (err.response.status === 401) {
        errorMessage = err.response.data.message
        dispatch(postAddressFailure(errorMessage))
        return dispatch(authError(errorMessage))
      }

      return dispatch(postAddressFailure(errorMessage))
    }
  }
}

export {
  loadAllAddesses,
  getAddress,
  createAddress
}
