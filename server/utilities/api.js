// utilities
import { readErrorMessageFromError } from "./index";

export async function makeARequest({
  requestFunction = () => {},
  payload = {},
  is_check_success = true,
}) {
  try {
    const response = await requestFunction(payload);

    if (is_check_success === true) {
      const { status, data } = response;
      if (status === 200 && data.success) {
        return {
          data,
        };
      } else {
        const message = data && data.message ? data.message : "Unknown error";
        const error_message = message;

        return {
          error_message,
          status: 500,
        };
      }
    } else {
      const { data } = response;
      return {
        data,
      };
    }
  } catch (e) {
    const { error_message, status } = readErrorMessageFromError(e);
    return {
      error_message,
      status,
    };
  }
}
