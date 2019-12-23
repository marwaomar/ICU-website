const express = require('express');
const path = require('path');
const router = express.Router();

//const User = require('../../models/User');
//const Post = require('../../models/Post');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
router.get('/p_login',(req,res)=>{
    res.render('home/p_login');
});
router.get('/patientsignup',(req,res)=>{
    res.render('home/patientsignup');
});
router.get('/patient',(req,res)=>{
    res.render('home/patient');
});
var mysql = require('mysql');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "icu"
});
router.post('/patientsignup', (req, res) => {
    console.log('data sent!!!!!!');
    console.log(req.body);
    pool.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");

            var pass = req.body.ppw;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pass, salt, (err, hash) => {
                    pass = hash;


        var sql = `INSERT INTO patientt (ID,F_Name,L_Name,Gender,Phone,Age,Date_of_entry,password) VALUES ('${req.body.pid}', '${req.body.fname}','${req.body.lname}','${req.body.pgender}','${req.body.pnumber}','${req.body.page}','${req.body.pdate}','${pass}')`;
        pool.query( sql, function (err, res) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
            });

    res.redirect('/p_login');
    });
});
// var ID = req.body.id;
router.post('/p_login', (req, res) => {
    pool.getConnection(function (err) {
        if (err) throw err;
        console.log("Login Connected!");


        var sql = `SELECT * FROM patientt WHERE ID = ?`;
        pool.query(sql, [req.body.pid], async function (err,rows,fields) {

            bcrypt.compare(req.body.ppw, rows[0].password).then((returnPassword) => {
                console.log(`this is respone ${returnPassword}`);
                if(!returnPassword){
                    console.log('wrong pass');
                    res.redirect('/p_login');
                }
                else{
                    console.log('hello');

                    res.render('home/patient', {patientt: rows[0]});
                    console.log({patientt : rows[0]});
                }

            });


            if (err) throw err;
        });

    });

});



module.exports = router;
