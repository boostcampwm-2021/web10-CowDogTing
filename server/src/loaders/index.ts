import * as express from "express";
import * as morgan from "morgan";
import * as session from "express-session";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import { Express } from "express";
import apiRouter from "../api";

export const loadApp = async (app: Express) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      secret: "asdfasdf",
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.use(express.static("src/public"));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      // origin: ["http://13.124.198.140:3000"],
      // origin: ["http://211.110.23.222:3000"],
      origin: ["http://localhost:3000"],
      credentials: true,
    }),
  );
  app.use(morgan("dev"));
  app.use("/uploads", express.static("uploads"));
  app.use("/api", apiRouter);
};
