const express = require("express");
const path = require("path");

const app = express();
const apiRouter = require("./routes/tasks");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/tasks", apiRouter);

module.exports = app;
