/**
 * use to create authorization headers
 * @param {*} userId
 * @param {*} token
 * @return uesrId_token
 */
export default (userId, token) => {
  if (userId && token) {
    return `${userId}_${token}`
  }
  return null
}

