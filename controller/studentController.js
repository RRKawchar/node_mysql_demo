const express = require('express');
const db = require('../config/db');

// Get All Student records || GET
const getStudent = async (req, res) => {
  try {

    const data = await db.query('SELECT * FROM student_table');
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Not Found Data",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get All Student Data Success",
      studentData: data[0]
    });

  } catch (error) {
    console.log(`Error while hiting getStudent ${error}`);
    res.status(500).send({
      success: false,
      message: 'Error in Get All API',
      error
    });
  }
};

// Insert Student records || POST
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


// update student records || PUT
const updateStudent = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        success: false,
        message: "Request body is missing",
      });
    }
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: "Invalid id or provide id"
      });
    }

    const { name, student_id, roll_no, class_name, medium, } = req.body;
    if (!name || !student_id || !roll_no || !class_name || !medium) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const data = db.query(`UPDATE student_table SET name=?,student_id=?, roll_no=?, class_name=?, medium=? WHERE id=?`,
      [name, student_id, roll_no, class_name, medium, studentId]);

    if (!data) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Data not found',
      });
    }

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: "Student Records Update Successfully!"
    });


  } catch (error) {
    console.log(`Error while hiting update student api ${error}`);
    res.status(500).send({
      success: false,
      message: 'Error while hit update student records',
      error
    });
  }

}


// search student records by student id|| GET
const searchStudentById = async (req, res) => {
  try {

    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid id or not match id",
      });
    }

    const data = await db.query('SELECT * FROM student_table WHERE id=?', [studentId]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Not Found Data",
      });
    }

    res.status(200).send({
      success: true,
      message: "Search Success",
      studentData: data[0]
    });

  } catch (error) {
    console.log(`Error while hiting search api ${error}`);
    res.status(500).send({
      success: false,
      message: 'Error while search student record',
      error
    });
  }
};


// search student records by student id|| GET
const deleteStudentRecordById = async (req, res) => {
  try {

    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid id or not match id",
      });
    }

    const data = await db.query('DELETE FROM student_table WHERE id=?', [studentId]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Not Found Data",
      });
    }

    res.status(200).send({
      success: true,
      statusCode:200,
      message: "Delete successfully!",
    
    });

  } catch (error) {
    console.log(`Error while hiting delete api ${error}`);
    res.status(500).send({
      success: false,
      message: 'Error while delete student record',
      error
    });
  }
};

// Test Methdo for connection check || GET
const getTestMethod = (req, res) => {
  res.status(200).send({
    success: true,
    message: "This is my first nodejs practice app",
  });

}





module.exports = {
  getStudent,
  createStudent, 
  updateStudent, 
  searchStudentById,
   deleteStudentRecordById, 
   getTestMethod
};