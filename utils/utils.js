import { format } from "date-fns";

export const getNameFromEmail = (email) => {
  const name = email?.includes("@") ? email.split("@")[0] : email;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
};
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const deepFlatten = (string, data) => {
  return string.split(".").reduce((acc, curr) => {
    return acc[curr];
  }, data);
};

export const getValuesFromKey = (keys, Obj) => {
  const newObj = {};
  keys.forEach((key) => {
    newObj[key] = Obj[key];
  });
  return newObj;
};

export const formatFirebaseDate = (ms) => {
  return format(new Date(ms.toMillis()), "do LLL yyyy");
};
