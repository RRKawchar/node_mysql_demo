const { bgBlack } = require('colors');
const express=require('express');
const morgan = require('morgan');
const dotenv=require('dotenv');
const mysqlPool = require('./config/db');


// configure dotenv
dotenv.config();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// port
const PORT=process.env.PORT||8000;

// routes
app.use("/api/v2/student",require("./routes/studentRoutes"));



///conditionaly listen
mysqlPool.query('SELECT 1').then(()=>{
console.log("MySQL DB is connected".bgGreen.bold.white);
//listen
app.listen(PORT,()=>{
  console.log(`Server is running on ${process.env.PORT}  `.bgBlue.white);
});
});


