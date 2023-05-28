import { notification } from "antd";

export const setToken = (data) => localStorage.setItem("veva:token", data);

export const removeToken = () => localStorage.removeItem("veva:token");

export const getToken = () => {
  const token = localStorage.getItem("veva:token");
  return token;
};

export const capitalize = (text) => {
  return text.name.charAt(0).toUpperCase() + text.name.slice(1);
};

export const emailValidator = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const formatAmount = (amount, n, x) => {
  const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return amount.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};

export const numberValidator = (number) => {
  const re = /[+-]?([0-9]*[.])?[0-9]+/;
  return re.test(String(number));
};

export const getSubString = (stringContent, start, end) => {
  const p = stringContent.indexOf(start) + start.length;
  return stringContent.substring(p, stringContent.indexOf(end, p));
};

export const openNotification = ({ title, message, type }) =>
  notification[type]({
    message: title,
    description: message,
    placement: "topRight",
    duration: 2.0,
  });

export const setLocationHistory = (location) =>
  sessionStorage.setItem("veva:redirect:location", JSON.stringify(location));

export const getLocationHistory = () => {
  return JSON.parse(sessionStorage.getItem("veva:redirect:location"));
};

export const setOrderFor = (user) => {
  sessionStorage.setItem("veva:order:user", JSON.stringify(user));
};

export const getOrderFor = () => {
  return JSON.parse(sessionStorage.getItem("veva:order:user"));
};
