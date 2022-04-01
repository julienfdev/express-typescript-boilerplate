import { NextFunction, Request, Response } from "express";
import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

// DB Connexion
import connect from './db/dbConnect';

// Routers
import indexRouter from "@/routes/RoutesIndex";
import actuatorRouter from "@/routes/RoutesActuator";
import sensorRouter from "@/routes/RoutesSensors";
import usersRouter from "@/routes/RoutesUser";
const app = express();

const db = 'mongodb://localhost:27017/API_MAISON_CONNECTEE';
connect({ db });

const allowedOrigins = ['http://localhost:8080'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", actuatorRouter);
app.use("/", usersRouter);
app.use("/", sensorRouter);

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
  res.status(err.status || 500);
  res.render("error");
});

export default app;
