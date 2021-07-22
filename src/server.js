import sirv from "sirv";
import polka from "polka";
import express from "express";
import fetch from "node-fetch";
import compression from "compression";
import bodyParser from "body-parser";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import send from "@polka/send-type";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticationMiddleware } from "./utils/authenticationMiddleware.js";
import * as sapper from "@sapper/server";

import { API_URL } from "./data/constants.js";

const { PORT, NODE_ENV, API_URL_ENV } = process.env;
console.log("DEVELOPMENT", NODE_ENV === "development");
const dev = NODE_ENV === "development";

function onProxyReq(proxyReq, req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  proxyReq.setHeader("Authorization", `Bearer ${cookies.token}`);
}

function onProxyRes(proxyRes, req, res) {}

function onError(err, req, res) {
  console.log("err", err);
}

const apiProxy = createProxyMiddleware("/api", {
  target: API_URL_ENV || API_URL,
  changeOrigin: true,
  cookieDomainRewrite: "localhost",
  onProxyReq,
  onProxyRes,
  onError,
});

const app = polka(); // You can also use Express
app.use(bodyParser.json());
app.use(cookieParser());

app.post("login", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const json = await response.json();
    if (json.err) {
      res.writeHead(400, "bad request");
      res.end(JSON.stringify({ error: "bad request" }));
    }
    let result = {};
    result.loggedin = true;
    result.user = json.user;
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", String(json.token), {
        httpOnly: true,
        maxAge: 2000000, // 20s
      }),
    ]);
    send(res, 200, result);
  } catch (e) {
    res.writeHead(400, "Bad request", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.end(JSON.stringify({ error: `cant getcode ${e}` }));
  }
});

app.post("refresh", async (req, res) => {
  try {
    const resp = await fetch(`${API_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: req.cookies.refresh_token }),
    });
    const token = await resp.json();
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", String(token.token), {
        httpOnly: true,
        maxAge: 200000, // 20s
      }),
      cookie.serialize("refresh_token", String(token.refresh_token), {
        httpOnly: true,
        maxAge: 36000000 * 128,
      }),
    ]);
    return send(res, 200, { message: "ok" });
  } catch (e) {
    res.writeHead(400, "Bad request", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.end(JSON.stringify({ error: `cant refresh ${e}` }));
  }
});

app
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    apiProxy,
    authenticationMiddleware,
    sapper.middleware({
      session: (req) => {
        return {
          loggedin: req.loggedin,
          user: req.user || "",
          cart: req.cart,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
