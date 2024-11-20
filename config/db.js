const mysql=require('mysql2/promise');

const mysqlPool=mysql.createPool(
   {
    host:'localhost',
    user:'root',
    password:'rrk@mysql123',
    database:'student_db_two'
   }
);


module.exports=mysqlPool;