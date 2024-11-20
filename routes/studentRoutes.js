const express=require('express');
const { getStudent,
     createStudent,
     } = require('../controller/studentController');


// create instance of route
const router=express.Router();

router.get("/getAll",getStudent);
router.post("/create",createStudent);



module.exports=router;