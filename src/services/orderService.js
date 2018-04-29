import {
  API
} from '../constants';
import {
  rest
} from '../utils';

const getByUserId = async (userId, token) => {
  return await rest.get(userId, token)(
    `${API}/user/${userId}/order`
  )
}

export default {
  getByUserId
}
