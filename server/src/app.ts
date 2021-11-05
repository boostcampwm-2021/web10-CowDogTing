import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
// import * as session from "express-session";
// import * as cookieParser from "cookie-parser";
import apiRouter from "./api";

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static("src/public")); // API Test
app.use(morgan("dev"));
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});

export default app;
