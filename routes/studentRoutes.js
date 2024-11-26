const express=require('express');
const { getStudent,
     createStudent,
     getTestMethod,
     } = require('../controller/studentController');


// create instance of route
const router=express.Router();

router.get("/getAll",getStudent);
router.post("/create",createStudent);

// Test Method
router.get("/test",getTestMethod);



module.exports=router;