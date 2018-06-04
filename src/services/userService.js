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

const patch = async (userId, token, user = {}) => {
  console.log(userId)
  console.log(token)
  console.log(user)
  const postData = {}
  if (user.nickName) {
    postData.nickName = user.nickName
  }
  if (user.sex) {
    postData.sex = user.sex
  }
  if (user.phone) {
    postData.phone = parseInt(user.phone, 10)
  }
  console.log(postData)
  console.log(`${URL}/${userId}`)
  return await rest.post(userId, token)(
    `${URL}/${userId}`,
    postData
  )
}

export default {
  get,
  post,
  patch
}
