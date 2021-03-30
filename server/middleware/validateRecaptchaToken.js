import axios from "axios";

// client config
import { RECAPTCHA_SECRET_KEY } from "../../../src/config/env";

export default async function (req, res, next) {
  try {
    const { recaptcha_value } = req.body;

    if (!recaptcha_value) {
      return res.status(500).json({
        message: `Invalid reCAPTCHA token`,
      });
    }

    const response = await axios({
      url: `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptcha_value}`,
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });

    const { data: recaptcha_data } = response;

    if (recaptcha_data.success === false) {
      return res.status(500).json({
        message: `Invalid reCAPTCHA token. Please refresh the page and try again.`,
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
}
