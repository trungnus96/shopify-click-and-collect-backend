import axios from "axios";

let _getReservationsSource;

export function cancelRequestIfNeeded() {
  // cancel the previous request
  if (typeof _getReservationsSource != typeof undefined) {
    _getReservationsSource.cancel("Operation canceled due to new request.");
  }

  // save the new request for cancellation
  _getReservationsSource = axios.CancelToken.source();
}

export function createAxiosRequest({
  url,
  method,
  payload,
  cancelToken,
  headers = {},
}) {
  const data = JSON.stringify(payload);

  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data,
    cancelToken,
  };

  return axios(config);
}
