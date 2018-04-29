import { isEmpty } from 'lodash';
var qs = require('qs');

export default (datas) => {
  if (isEmpty(datas)) {
    return null
  }

  const dataName = Object.keys(datas)
  const requestData = []
  dataName.map((name) => {
    requestData[name] = datas[name]
  })

  return qs.stringify(requestData)
}
