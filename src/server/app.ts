import airlines from "./app/routes/api/airlines";
import airports from "./app/routes/api/airports";
import flight_search from "./app/routes/api/flight_search";
import index from "./app/routes/index";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as favicon from "serve-favicon";
import * as path from "path";

const app = express();

// view engine setup
app.set("views", "./dist/views");
app.set("view engine", "ejs");

app.use(favicon("./dist/public/favicon.ico"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./dist/public"));

app.use("/", index);
app.use("/api/", [airlines, airports, flight_search]);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found") as any;
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
