const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
let sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'icu'
});
sqlConnection.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});




//select certain doctor
router.get('/select_ssn',(req,res)=>{
    res.render('home/select');
});

router.post('/select_ssn',(req,res)=>{
    let sql = 'SELECT * FROM doctor where ssn = ?'
    sqlConnection.query(sql, [req.body.ssn], (err, rows, fields) => {

        if (!err)
            res.render('home/select',{doctor : rows});
        else
            console.log(err)
    }) ;
});


router.get('/update',(req,res)=>{
    res.render('home/update');
});

router.post('/update',(req,res)=>{
    let sql = 'SELECT * FROM doctor where ID = ?'
    sqlConnection.query(sql, [req.body.id], (err, rows, fields) => {

        if (!err)
            res.render('home/update',{doctor : rows});
        else
            console.log(err)
    }) ;
});

router.post('/update_ssn',(req,res)=>{ //er1
    let sql = `UPDATE doctor SET F_Name = '${req.body.fname}' , L_Name = '${req.body.lname}' ,SSN = '${req.body.ssn}', ID = '${req.body.id}', Gender = '${req.body.gender}', Phone = '${req.body.phone}',Address = '${req.body.address}',Position = '${req.body.position}',Degree = '${req.body.degree}',birth-of-date = '${req.body.bd}',Department = '${req.body.depart}',E-mail = '${req.body.email}' WHERE ssn = '${req.body.ssn}'`;
    sqlConnection.query(sql, (err, rows, fileds) => {
        if (!err) {
            console.log('doctor updated');
            res.redirect('home/doctor'); //er1
        } else {
            console.log(err);
        }
    });

});




// insert doctor
router.get('/sgnUp1',(req,res)=>{
    res.render('home/signUp1');
});
router.post('/signUp1', (req, res) => {

        if (req.body.password !== req.body.confirm_password) {

            console.log("passwords don't match");}
            else{
        sqlConnection.query(`INSERT INTO doctor(F_Name,L_Name,SSN,ID,Address,Position,Degree,birth-of-date,Department,E-mail,Password)VALUES('${req.body.fname}','${req.body.lname}','${req.body.ssn}','${req.body.id}' ,'${req.body.address}','${req.body.position}','${req.body.degree}','${req.body.bd}','${req.body.depart}','${req.body.email}','${req.body.password})`, (err, rows, fields) => {
            if (!err) {
                if (req.body.id == 0) {
                    res.redirect('/admin');
                }
                else {
                    res.redirect('/doctor');
                }
                console.log('Doctor inserted');
            } else {
                console.log(err);
            }
        })

        }

});

//delete doctor
router.get('/delete',(req,res)=>{
    res.render('home/delete');
});

router.post('/delete',(req,res)=>{
    let sql = 'DELETE FROM doctor where ID = ?';
    sqlConnection.query(sql, [req.body.id], (err, rows, fields) => {
        if (!err)
            res.redirect('/doctor');
        else
            console.log(err);
    })
});


router.get('/doctor',(req,res)=>{
    res.render('home/doctor');
});
module.exports = router;