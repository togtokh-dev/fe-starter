import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routers from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import compression from "compression";
const jsonParser = bodyParser.json();
const app: Express = express();

const cors_urls = [];
app.use(
  cookieParser(),
  fileupload(),
  jsonParser,
  compression(),
  lusca.xframe("SAMEORIGIN"),
  lusca.xssProtection(true),
  cors({
    origin: "*",
    allowedHeaders: "Set-Cookie, Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
  function (req, res, next) {
    next();
    express.json();
  }
);

app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   "/",
//   express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
// );
app.use(routers);
app.set("port", process.env.PORT || 3000);
export default app;
