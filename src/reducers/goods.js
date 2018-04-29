import {
  FETCH_GOODS,
  RECEIVE_GOODS,
  SEARCH_GOODS,
  RECEIVE_SEARCH,
  GET_GOOD,
  RECEIVE_ONE_GOOD
} from '../actions/types'

const initialState = {
  searchs: [],
  goods: [],
  good: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_GOODS:
      return Object.assign({}, state, {
        goods: []
      })
    case RECEIVE_GOODS:
      return Object.assign({}, state, {
        goods: action.payload
      })
    case SEARCH_GOODS:
      return Object.assign({}, state, {
        searchs: []
      })
    case RECEIVE_SEARCH:
      return Object.assign({}, state, {
        searchs: action.payload
      })
    case GET_GOOD:
      return Object.assign({}, state, {
        good: {}
      })
    case RECEIVE_ONE_GOOD:
      return Object.assign({}, state, {
        good: action.payload
      })
    default:
      return state
  }
}
