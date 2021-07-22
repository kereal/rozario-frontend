import cookie from "cookie";
import fetch from "node-fetch";
import { API_URL } from "../data/constants.js";

async function authenticationMiddleware(req, res, next) {
  let cookies = cookie.parse(req.headers.cookie || "");
  if (cookies.token) {
    try {
      const user = await fetch(`${API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      const json = await user.json();
      if (user.status === 401) {
      } else if (user.status >= 400) {
        req.user = "";
        req.loggedin = false;
        req.refresh_token = null;
        req.cart = [];
      } else {
        req.loggedin = true;
        req.user = json.email;
        req.refresh_token = json.refresh_token;
        req.cart = json.cart;
      }
    } catch (e) {
      console.log("cannot get user", e.toString());
    }
  } else {
    req.user = "";
    req.loggedin = false;
    req.refresh_token = null;
    req.cart = [];
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", { maxAge: new Date(0) })
    );
  }
  next();
}
export { authenticationMiddleware };
