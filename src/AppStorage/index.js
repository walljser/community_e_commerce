import React from 'react';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import SYNC from './sync';

let storage
const defaultExpires = 1000 * 3000 * 24 * 7 // 七天
const size = 1000

export default class AppStorage extends React.Component {
  /**
   * 初始化storage
   */
  static _getStorage() {
    if (storage == undefined) {
      storage = new Storage({
        size: size,
        storageBackend: AsyncStorage,
        defaultExpires: defaultExpires,
        enableCache: true
      })
    }

    return storage
  }

  static isInit() {
    if (storage == undefined) {
      throw Error('请先调用初始化函数')
    }
  }

  /**
   * save method
   *
   * @static
   * @param {any} key 保存的key值
   * @param {any} object 保存的value
   * @param {any} expires 有效时间，如果为null, 则为永不过期
   * @memberof AppStorage
   */
  static _save(key, object, expires = defaultExpires) {
    this.isInit()

    storage.save({
      key: key,
      data: object,
      expires: expires
    })
  }

  /**
   * 删除单个数据
   *
   * @static
   * @param {any} key
   * @memberof AppStorage
   */
  static _remove(key) {
    this.isInit()

    storage.remove({
      key: key
    })
  }

  /**
   * 移除所有key-id的数据
   */
  static _clear() {
    this.isInit()

    storage.clearMap()
  }

  /**
   * 移除单个key下的所有数据
   *
   * @static
   * @param {any} key
   * @memberof AppStorage
   */
  static _clearDataByKey(key) {
    this.isInit()

    storage.clearMapForKey(key)
  }

  // static async _load(key, callback) {
  //   this.isInit()

  //   storage.load({
  //     key: key
  //   }).then(ret => {
  //     callback(ret)
  //     return ret
  //   }).catch(err => {
  //     switch (err.name) {
  //       case 'NotFoundError':
  //         return {
  //           code: -1,
  //           message: '没有找到'
  //         }
  //       case 'ExpiredError':
  //         return {
  //           code: -2,
  //           message: '数据已过期'
  //         }
  //       default:
  //         return null
  //     }
  //   })
  // }

  /**
    查询数据
  */
  static _load(key, callBack) {
    this._load3(key, null, null, callBack);
  }


  static _load3(key, params, someFlag, callBack) {

    this.isInit();
    storage.load({
      key: key,
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true,

      // 你还可以给sync方法传递额外的参数
      syncParams: {
        params,
        someFlag: someFlag,
      },
    }).then(ret => {

      callBack(ret);
      return ret;
    }).catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });
  }
}
