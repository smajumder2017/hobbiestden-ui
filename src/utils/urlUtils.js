export function stringifyQueryParams(obj = {}, encodeFn = encodeURIComponent) {
  if (!Object.keys(obj).length) return '';

  return `?${Object.keys(obj)
    .filter((key) => !!obj[key])
    .map((key) => {
      const value = obj[key];
      return Array.isArray(value)
        ? value.map((val) => `${key}=${encodeFn(val)}`).join('&')
        : `${key}=${encodeFn(obj[key])}`;
    })
    .join('&')}`;
}

export function queryParamsToObject(str = '') {
  if (!str) return {};
  if (str.startsWith('?')) {
    str = str.slice(1);
  }
  const params = str.split('&');
  return params.reduce((queryParamObject, param) => {
    let [key, value] = param.split('='); // eslint-disable-line prefer-const
    if (queryParamObject[key]) {
      value = Array.isArray(queryParamObject[key])
        ? [...queryParamObject[key], value]
        : [queryParamObject[key], value];
    }
    return {
      ...queryParamObject,
      [key]: value
    };
  }, {});
}

export function getQueryParamMultipleValues(name, values = []) {
  return values.map((v) => `${name}=${v}`).join('&');
}
