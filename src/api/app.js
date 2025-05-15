// main
require("dotenv").config();
const hobbiesRouter = require("./routers/hobbyRouter");
const coursesRouter = require("./routers/courseRouter");
const studentsRouter = require("./routers/studentRouter");

// init express
const express = require("express");
const app = express();

// use routers
app.use("/hobbies", hobbiesRouter);
app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);

// start server
port = process.env.port || 0;
app.listen(port, ()=> {console.log(`started service on ${port}`)});