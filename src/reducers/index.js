import { combineReducers } from 'redux';
import auth from './auth';
import userInfo from './user';
import service from './service';
import goods from './goods';
import cart from './cart';
import address from './address';
import orders from './orders';

export default combineReducers({
  auth,
  userInfo,
  service,
  goods,
  address,
  cart,
  orders
})
