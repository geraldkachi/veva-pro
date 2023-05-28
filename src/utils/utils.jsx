/* eslint-disable no-useless-escape */
import { toastr } from "react-redux-toastr";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
// get error messages for react hook form inputs
export const getError = (errors, name) => {
  const result = name.split(".").reduce((prev, cur) => prev?.[cur], errors);
  console.log(errors.scheme[0].schemeTitle);
  return result;
};
export const generateId = () => Math.random().toString(36).substr(2, 9);

//Format value with comma and add Naira sign
export const formatCurrency = (number, currency = "NGN") => {
  if (number === undefined) return 0;
  number = Number(number);
  return Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
  }).format(number);
};

export const toCurrency = (amount) => {
  return formatCurrency(parseFloat(amount)).split(".00")[0];
};

// truncate string
export const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};
export const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );
// remove empty objects and array from the obj
export const removeEmpty = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (typeof v === "number") return true;
      else return v !== "" && v && v?.length > 0;
    })
  );
};
export function getYtId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
// copy to clipboard
export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

export const removeObj = (arr) => arr.map((el) => Object.values(el));
// convert react hook form arr of objects to arr of strings
export const makeArr = (arr, name) => arr.map((el) => el[name]);

export const moneyFormatter = (val, amount) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(val)) >= 1.0e9
    ? (Math.abs(Number(val)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(val)) >= 1.0e6
    ? (Math.abs(Number(val)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(val)) >= 1.0e3
    ? (Math.abs(Number(val)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(val))
    ? Math.abs(Number(val) / 1.0)
    : Math.abs(Number(val)) >= 1.0
    ? isNaN(val)
    : "";

  // ? ({ val = Math.sign(val) * Math.abs(val) })
};

// capitalize first letter of each word in a sentence
export function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

// Check if url is valid
export function isValidURL(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  if (res !== null) return true;
}

export const toaster = (type, msg) => {
  switch (type) {
    case "success":
      toastr.success("", msg, {
        icon: <CheckIcon color="white" />,
      });
      break;
    case "error":
      toastr.error("", msg, {
        icon: <ErrorIcon color="white" />,
      });
      break;
    case "warn":
      toastr.warning("", msg, {
        icon: <WarningIcon color="white" />,
      });
      break;

    default:
      break;
  }
};

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort(array = [], comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const downloader = (url, fileName) => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  // the filename you want
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
