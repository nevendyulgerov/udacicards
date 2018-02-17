

/**
 * @description Check if value is of type 'function'
 * @param val
 * @returns {boolean}
 */
export const isFunc = (val: any) => typeof val === 'function';

/**
 * @description Extend
 * @param obj
 * @param extenders
 * @returns {*|any}
 */
export const extend = (obj, ...extenders) => {
  return extenders.reduce((accumulator, object) => {
    accumulator = Object.assign(accumulator, object);
    return accumulator;
  }, obj);
};

/**
 * @description Serialize
 * @param data
 * @returns {string}
 */
export const serialize = data => JSON.stringify(data);

/**
 * @description Deserialize
 * @param data
 * @returns {any}
 */
export const deserialize = data => JSON.parse(data);

/**
 * @description Create sequential execution for async functions
 * @returns {{chain: chain, execute: execute}}
 */
export const sequence = (func) => {
  const chained: any[] = [];
  let value: any;
  let error: any;

  const chain = (func: (seq?: any) => void) => {
    if (chained) {
      chained.push(func);
    }
    return { chain, execute };
  };

  if (isFunc(func)) {
    chain(func);
  }

  const execute = (index?: number) => {
    index = index || 0;
    let callback: (seq: any) => void;
    if (!chained || index >= chained.length) {
      return { chain, execute };
    }

    callback = chained[index];
    callback({
      resolve(val?: any) {
        value = val;
        error = null;
        execute(++index);
      },
      reject(err?: any) {
        error = err;
        value = null;
        execute(++index);
      },
      response: { value, error },
    });
  };

  return { chain, execute };
};
