import { NextFunction, Request, Response } from "express";
import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";

// Routers
import indexRouter from "@/routes/Index";
import actuatorRouter from "@/routes/Actuator";
import sensorRouter from "@/routes/Sensor";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
const app = express();

// view engine setup
const whitelist = ["http://localhost:8080", "http://192.168.1.34:8080", "http://localhost", "http://192.168.1.34"];
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin!) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
} as CorsOptions;
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/actuator", actuatorRouter);
app.use("/sensor", sensorRouter);
// catch 404
app.use(function (req: Request, res: Response, next: NextFunction) {
  // handle it how it pleases you
  res.status(404).json({ message: "not_found" });
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  if (err instanceof PrismaClientKnownRequestError) {
    res.status(400).json({
      code: err.code,
      meta: err.meta,
      name: err.name,
    });
  } else if (err instanceof PrismaClientUnknownRequestError) {
    res.status(400).json({
      name: err.name,
    });
  } else if (err instanceof PrismaClientValidationError) {
    res.status(400).json({
      name: err.name,
      message: err.message,
    });
  } else {
    res
      .status(err.status || 500)
      .json(err.meta ? err.meta : err.message ? { message: err.message } : err);
  }
});

export default app;
