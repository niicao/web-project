import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import apirouter from "../routes/api.routes.js";
import cors from "cors";
import logger from "./logger.js";
import checkDatabaseConnection from "./dbsync.js";

const corsOptions = {
  origin: true,
  credential: true
};


const app = express();
app.use(express.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, ALL');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

   // Intercept OPTIONS method
   if (req.method === 'OPTIONS'){
    // If it's an OPTIONS request, respond with 200 and end the response
    res.status(200).end();
  }else{
    // Pass to next layer of middleware
    next();
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(apirouter);


const PGHOST = process.env.PGHOST;
const PGUSER = process.env.PGUSER;
const PGDATABASE = process.env.PGDATABASE;
const PGPASSWORD = process.env.PGPASSWORD;

const port = 5001;

async function startServer() {

  await checkDatabaseConnection();

  app.listen(port, () => {
    logger.info(`Serviço executando na porta ${port}`);
  });

}


startServer();
