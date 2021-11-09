import * as express from "express";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import * as cors from "cors";
import apiRouter from "./api/auth";
import passportConfig from "./passport";

dotenv.config();

const app: express.Application = express();
passportConfig();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
// app.use(express.static("src/public")); // API Test
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  console.log("세션");
  console.log(req.session);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

export default app;
