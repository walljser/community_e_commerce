import {
  API
} from '../constants'
import axios from 'axios';
import {
  rest,
  postData
} from '../utils';

const URL = `${API}/user`

const get = async (userId, token) => {
  return await rest.get(userId, token)(
    `${URL}/${userId}`
  )
}

const post = async (userName, passWord, phone) => {
  return await axios.post(URL, postData({
    userName,
    passWord,
    phone
  }))
}

export default {
  get,
  post
}
