import {
  rest
} from '../utils/';
import {
  API
} from '../constants';

const URL = `${API}/user`

const DEFAULT_ADDRESS = {
  consignee: "",
  city: "",
  phone: 110,
  address: "",
  streetNumber: "",
  isDefault: false
}

const all = async (userId, token) => {
  return await rest.get(userId, token)(
    `${URL}/${userId}/address`
  )
}

const one = async (userId, token, addressId) => {
  return await rest.get(userId, token)(
    `${URL}/${userId}/address/${addressId}`
  )
}

const create = async (userId, token, address) => {

  const postAddress = Object.assign({}, DEFAULT_ADDRESS, address)
  return await rest.post(userId, token)(
    `${URL}/${userId}/address`,
    {
      consignee: postAddress.consignee,
      city: postAddress.city,
      phone: postAddress.phone,
      address: postAddress.address,
      streetNumber: postAddress.streetNumber,
      isDefault: postAddress.isDefault
    }
  )
}

export default {
  all,
  one,
  create
}
