import axios from 'axios';
import {
  API
} from '../constants';

const URL = `${API}/category/first`;

const all = async function() {
  return await axios.get(URL)
}

export default {
  all
}
