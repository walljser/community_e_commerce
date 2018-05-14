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

const one = async function (userId, token, addressId) {
  return await rest.get(userId, token)(
    `${URL}/${userId}/address/${addressId}`
  )
}

const create = async function (userId, token, address) {
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

const alterDefault = async function (userId, token, address) {
  return await rest.post(userId, token)(
    `${URL}/${userId}/address/${address.addressId}`,
    {
      isDefault: address.isDefault || null
    }
  )
}

const remove = async function (userId, token, addressId) {
  return await rest.remove(userId, token)(
    `${URL}/${userId}/address/${addressId}`
  )
}

const update = async function (userId, token, address) {
  return await rest.post(userId, token)(
    `${URL}/${userId}/address/${address.addressId}`,
    address
  )
}

export default {
  all,
  one,
  create,
  alterDefault,
  remove,
  update
}
