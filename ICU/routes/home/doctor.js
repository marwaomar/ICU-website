// const express = require('express');
// const router = express.Router();
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "icu"
// });
// router.get('/doctor',(req,res)=>{
//     res.render('home/doctor');
// });

// router.post('/signUp1', (req, res) => {
//     console.log(req.body);
//     con.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//         //Insert a record in the "customers" table:
//         var sql = `INSERT INTO doctor (ID,SSN, F_Name,L_Name) VALUES ('${req.body.id}', '${req.body.ssn}','${req.body.fname}','${req.body.lname}')`;
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("1 record inserted");
//         });
//     });
// });

//     module.exports = router;
