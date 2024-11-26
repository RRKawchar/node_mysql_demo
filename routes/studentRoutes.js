const express=require('express');
const { getStudent,
     createStudent,
     getTestMethod,
     updateStudent,
     searchStudentById,
     deleteStudentRecordById,
     } = require('../controller/studentController');


// create instance of route
const router=express.Router();

// Get all Student records || GET
router.get("/getAll",getStudent);

//Insert Student Records || POST
router.post("/create",createStudent);

// Update Student Records || PUT
router.put("/update/:id",updateStudent);

// Search student records by id || GET
router.get("/query/:id",searchStudentById);

// Delete Student Records by id || DELETE
router.delete("/delete/:id",deleteStudentRecordById);

// Test Method
router.get("/test",getTestMethod);



module.exports=router;