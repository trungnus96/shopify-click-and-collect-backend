// libs
import { v4 as uuidv4 } from "uuid";

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function toUrlEncoded(obj) {
  return Object.keys(obj)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");
}

export function readErrorMessageFromError(e) {
  let error_message = e.toString();
  try {
    const { response } = e;
    const { status, data } = response;

    const { message, errors } = data;

    if (typeof errors === "string") {
      return { error_message: errors, status };
    }

    if (typeof message === "string") {
      return { error_message: message, status };
    }

    const { error_description, error } = message;
    if (error_description) {
      error_message = `${error_description}`;
    } else if (error) {
      error_message = `${error}`;
    }

    return { error_message, status };
  } catch (_e) {
    // do nothing
  }

  return { error_message, status: 500 };
}

export function generateRandomString() {
  return Math.random().toString(36).substring(2, 30) + "_" + Date.now();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateUniqueId({ group_number = "MxgGxo" }) {
  return (
    group_number.replace(/_/g, "") +
    "#" +
    uuidv4().replace(/-/g, "").toUpperCase().substring(0, 8) +
    "#" +
    Math.round(Date.now() / 1000)
  );
}
