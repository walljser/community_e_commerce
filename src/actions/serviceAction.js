import {
  SERVICE,
  SERVICE_SUCCESS,
  SERVICE_FAILURE,
  POSTING,
  POST_SUCCESS,
  POST_FAILURE
} from './types'

function service() {
  return {
    type: SERVICE
  }
}

function serviceSuccess() {
  return {
    type: SERVICE_SUCCESS
  }
}

function serviceFailure(message) {
  return {
    type: SERVICE_FAILURE,
    payload: message
  }
}

function posting() {
  return {
    type: POSTING
  }
}

function postSuccess() {
  return {
    type: POST_SUCCESS
  }
}

function postFailure(message) {
  return {
    type: POST_FAILURE,
    payload: message
  }
}

export {
  service,
  serviceSuccess,
  serviceFailure,
  posting,
  postSuccess,
  postFailure
}
