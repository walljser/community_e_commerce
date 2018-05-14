import areaData from './citys';
export const areas = areaData.provinces;
export const API = 'http://yushijie.club:8080/cloudcommodity/user/v1';
export const IMAGE_URL = 'http://yushijie.club/cloudimg/goods/';
// export const API = 'http://192.168.191.1:8080/user/v1';
export const USER_ID = 'userId';
export const TOKEN = 'token';
export const PRIMARY_COLOR = '#3f51b5';
export const RED_COLOR = '#f56c6c';
export const RED_COLOR_ACTIVE = '#ff5a5f';
export const BORDER_COLOR = '#efeff4';
export const RE_USERNAME = /^[a-zA-Z]\w{6,25}$/
export const RE_PHONE = /^1\d{10}$/;
export const SERVICE_CONTENT = `开发人员cellphone： 13075970590
开发人员email： gre_yu@163.com`;
export const SUGGEST_CONTENT = `请把意见发送到邮箱：gre_yu@163.com`;
export const GITHUB_CONTENT = `github: https://github.com/greyu`;


/**
  * 订单待发货状态
  */
export const ORDER_WAIT = 0;

/**
  * 订单配送中状态
  */
export const ORDER_DISPATCHING = 1;

/**
  * 订单确认送达状态
  */
export const ORDER_FINISH = 2;

/**
  * 订单退款中状态
  */
export const ORDER_REFUNDING = 3;

/**
  * 订单退款完成
  */
export const ORDER_REFUND_SUCCESS = -1;

/**
  * 订单退款失败
  */
export const ORDER_REFUNDING_FAILURE = -2;
