/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import { employeesRouter } from "./employeeInfo/employees.router";
 import { errorHandler } from "./middleware/error.middleware";
 import { notFoundHandler } from "./middleware/not-found.middleware";
 
//  import {Request, Response} from "express";
// import { mongo } from "mongoose";
 
//  var assert = require('assert');
 var router = express.Router();
 
 dotenv.config();

/**
 * App Variables
 */
 if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

/**
 *  App Configuration
 */
 app.use(helmet());
 app.use(cors());
 app.use(express.json());
 app.use('/employees', employeesRouter);
 app.use(errorHandler);
 app.use(notFoundHandler);

/**
 * Server Activation
 */
 app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!!!!" });
});

const db = require("../db/db.index");
//const MongoClient = require('mongodb').MongoClient;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // const db = client.db.dbname;
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: any ) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//  router.get('/', function (req, res, next){
//    res.render('index');
//  });

//  router.get('/get-data', function(req, res, next){
//     assert.equal(null, err);
//  });

//  router.post('/insert', function(req, res, next){
//     var empInfo = {
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       role: req.body.role,
//       email: req.body.email
//     };
//  });

//  router.post('/update', function(req, res, next){

//  });

//  router.post('/delete', function(req, res, next){
 
//  });

//  module.exports = router;