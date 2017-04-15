const callbackOnPredicate = (
  predicate,
  callback
) => store => next => action => {
  const result = next(action);

  if (predicate(action.type)) {
    callback(action, store);
  }

  return result;
};

export const blacklist = (blacklistActions, callback) => {
  if (process.env.NODE_ENV !== "production") {
    if (!Array.isArray(blacklistActions)) {
      throw new Error("blacklist middleware expected array as first argument");
    }

    if (typeof callback !== "function") {
      throw new Error("blacklist middleware expected function as callback");
    }
  }

  return callbackOnPredicate(
    type => blacklistActions.indexOf(type) === -1,
    callback
  );
};

export const whitelist = (whitelistActions, callback) => {
  if (process.env.NODE_ENV !== "production") {
    if (!Array.isArray(whitelistActions)) {
      throw new Error("whitelist middleware expected array as first argument");
    }

    if (typeof callback !== "function") {
      throw new Error("whitelist middleware expected function as callback");
    }
  }

  return callbackOnPredicate(
    type => whitelistActions.indexOf(type) !== -1,
    callback
  );
};
