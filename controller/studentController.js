const express= require('express');
const db=require('../config/db');


const getStudent=async(req,res)=>{
    try {
        
        const data = await db.query('SELECT * FROM student_table');
        if(!data){
            return res.status(404).send({
                  success:false,
                  message:"Not Found Data",
            });
        }

        res.status(200).send({
          success:true,
          message:"Get All Student Data Success",
          studentData:data[0]
        });

    } catch (error) {
        console.log(`Error while hiting getStudent ${error}`);
         res.status(500).send({
          success:false,
          message:'Error in Get All API',
          error
        });
    }
};


const createStudent = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          success: false,
          message: "Request body is missing",
        });
      }
  
      const { name, student_id, roll_no, class_name, medium } = req.body;
  
      if (!name || !student_id || !roll_no || !class_name || !medium) {
        return res.status(400).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
  
      const data = await db.query(
        `INSERT INTO student_table(name,student_id,roll_no,class_name,medium) VALUES(?, ?, ?, ?, ?)`,
        [name, student_id, roll_no, class_name, medium]
      );
      if (!data) {
        return res.status(404).send({
          success: false,
          statusCode: 404,
          message: "Failed to create Student API",
        });
      }
      res.status(201).send({
        success: true,
        statusCode: 201,
        message: "New Student Added Successfully",
      });
    } catch (error) {
      console.error(`Error while creating student: ${error}`);
      res.status(500).send({
        success: false,
        message: "Failed to create Student",
        error,
      });
    }
  };
  


module.exports={getStudent,createStudent};