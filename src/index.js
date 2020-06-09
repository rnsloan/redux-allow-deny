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

export const denylist = (denylistActions, callback) => {
  if (process.env.NODE_ENV !== "production") {
    if (!Array.isArray(denylistActions)) {
      throw new Error("denylist middleware expected array as first argument");
    }

    if (typeof callback !== "function") {
      throw new Error("denylist middleware expected function as callback");
    }
  }

  return callbackOnPredicate(
    type => denylistActions.indexOf(type) === -1,
    callback
  );
};

export const allowlist = (allowlistActions, callback) => {
  if (process.env.NODE_ENV !== "production") {
    if (!Array.isArray(allowlistActions)) {
      throw new Error("allowlist middleware expected array as first argument");
    }

    if (typeof callback !== "function") {
      throw new Error("allowlist middleware expected function as callback");
    }
  }

  return callbackOnPredicate(
    type => allowlistActions.indexOf(type) !== -1,
    callback
  );
};
