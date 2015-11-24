export const blacklist = (blacklistActions, callback) => {
  return store => next => action => {
    const result = next(action)

    if (!Array.isArray(blacklistActions)) {
      console.error('blacklist middleware expected array as first argument:', blacklistActions)
      return result
    }

    if (typeof callback !== 'function') {
      console.error('blacklist middleware expected function as callback:', callback)
      return result
    }

    if (blacklistActions.indexOf(action.type) === -1) {
      callback(action, store)
    }

    return result
  }
}

export const whitelist = (whitelistActions, callback) => {
  return store => next => action => {
    const result = next(action)

    if (!Array.isArray(whitelistActions)) {
      console.error('whitelist middleware expected array as first argument:', whitelistActions)
      return result
    }

    if (typeof callback !== 'function') {
      console.error('whitelist middleware expected function as callback:', callback)
      return result
    }

    if (whitelistActions.indexOf(action.type) !== -1) {
      callback(action, store)
    }

    return result
  }
}

export default {
  blacklist: blacklist,
  whitelist: whitelist,
}