import axios from 'axios';
import {
  API
} from '../constants';

const all = async () => {
  return await axios.get(`${API}/advs`)
}

export default {
  all
}
