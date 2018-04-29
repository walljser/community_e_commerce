import axios from 'axios';
import {
  postData
} from '../utils';
import {
  API
} from '../constants';

const URL = `${API}/tokens`

const post = async (userName, passWord) => {
  return await axios.post(URL, postData({
    userName: userName,
    passWord: passWord
  }))
}

export default {
  post
}
