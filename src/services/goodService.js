import axios from 'axios';
import {
  API
} from '../constants';

const URL = `${API}/goods`

const search = async (page = 1, rows = 10, good) => {
  if (good) {
    return await axios.get(URL, {
      params: {
        page: page,
        rows: rows,
        goodId: good.goodId,
        goodName: good.goodName,
        categorySecondId: good.categorySecondId
      }
    })
  } else {
    return await axios.get(URL, {
      params: {
        page: page,
        rows: rows
      }
    })
  }
}

const all = async (page = 1, rows = 10, orderBy, good) => {
  if (good) {
    return await axios.get(URL, {
      params: {
        page: page,
        rows: rows,
        goodId: good.goodId,
        goodName: good.goodName,
        categorySecondId: good.categorySecondId,
        orderBy: orderBy
      }
    })
  } else {
    return await axios.get(URL, {
      params: {
        page: page,
        rows: rows,
        orderBy: orderBy
      }
    })
  }
}

const one = async (goodId) => {
  return await axios.get(`${URL}/${goodId}`)
}

export default {
  search,
  all,
  one
}
