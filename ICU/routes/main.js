const express = require('express');
const path = require('path');
const router = express.Router();

//const User = require('../../models/User');
//const Post = require('../../models/Post');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
//router.all('/*',(req,res,next)=>{
  //  req.app.locals.layout = 'home';
    //next();
//});

router.get('/',(req,res)=>{
    res.render('home/index');
});
router.get('/aboutUs',(req,res)=>{
    res.render('home/aboutUs');
});

router.get('/login',(req,res)=>{
    res.render('home/login');
});
router.get('/contactUs',(req,res)=>{
    res.render('home/contactUs');
});
router.get('/signUp1',(req,res)=>{
    console.log('connected to signup page!');
    res.render('home/SignUp1');
    //res.sendFile(path.join(__dirname, '..', 'views', 'home', 'SignUp1.html'));
});

router.get('/p_login',(req,res)=>{
    res.render('home/p_login');
});
router.get('/thank_you',(req,res)=>{
    res.render('home/thank_you');
});

router.get('/admin',(req,res)=>{
    res.render('home/admin');
});


router.get('/patient',(req,res)=>{
    res.render('home/patient');
});
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "icu"
});
router.get('/doctor',(req,res)=>{
    res.render('home/doctor');
});


router.post('/SignUp1', (req, res) => {
    console.log('data sent!!!!!!');
    console.log(req.body);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        if (req.body.password !== req.body.confirm_password) {
            req.flash("passwords don't match");
            console.log("passwords don't match");
            res.render('/signUp1');
        }
        else {

            var pass = req.body.password;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pass, salt, (err, hash) => {
                    pass = hash;

                    var sql = `INSERT INTO doctor (ID,SSN, F_Name,L_Name,Admin,Password,Gender,Phone,Address,Position,Degree,birth_of_date,Department,E_mail) VALUES ('${req.body.id}', '${req.body.ssn}','${req.body.fname}','${req.body.lname}','0', '${pass}', '${req.body.gender}', '${req.body.phone}', '${req.body.address}', '${req.body.position}', '${req.body.degree}', '${req.body.bd}', '${req.body.depart}','${req.body.email}')`;
                    con.query(sql, function (err, res) {
                        if (err) throw err;
                        console.log("1 record inserted");
                    });
                });
            });
        }
        res.redirect('/doctor');
    });
});
//troubleshooting:


// var ID = req.body.id;
router.post('/login', (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Login Connected!");

        var sql = `SELECT * FROM doctor WHERE ID = ?`;
        con.query(sql, [req.body.id], async function (err,rows,fields) {

            bcrypt.compare(req.body.password, rows[0].Password).then((returnPassword) => {
                console.log(`this is respone ${returnPassword}`);
                if(!returnPassword){
                    console.log('wrong pass');
                    res.redirect('/login');
                }
                else{
                    console.log('hello');

                    res.render('home/doctor', {doctor: rows[0]});
                    console.log({doctor : rows[0]});
                }

            });


            if (err) throw err;
        });

        });

});/*
router.get('/login',(req,res)=>{
    var pass = `SELECT password FROM doctor WHERE ID = ?`;
    con.query(pass, [req.body.id],  function (err,rows,fields){
        if (!err) {
            res.render('home/doctor', {doctor: rows[0]});
            console.log({doctor : rows[0]});
        }
        else
            console.log(err)
    }) ;
});
*/
    /*
    router.get('/post',(req,res)=>{
        res.render('home/post');
    });



    router.get('/login',(req,res)=>{
        res.render('home/login');
    });



    router.get('/Registration',(req,res)=>{
        res.render('home/registration');
    });

    router.post('/register',(req,res)=>{

        const newUser = new User({

            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
        });
        if (req.body.password !== req.body.passwordConfirm) {
            //  req.flash('not_matched_passwords',"passwords don't match");
            console.log("passwords don't match");
            /*res.render('home/registration',{
                //not_matched_passwords : req.flash('not_matched_passwords'),
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
            });
        }else {

            User.findOne({email: req.body.email}).then(user => {
                if (!user) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(savedUser => {
                                //  req.flash('success_register','You are now registered,Please login');
                                console.log('success_register', 'You are now registered,Please login');
                                //  res.redirect('/login');
                            });
                            console.log(hash);
                        });
                    });
                } else {
                    // req.flash('already_user','The E-mail exists,please login');
                    console.log('The E-mail exists,please login');
                    //    res.redirect('/login');
                }
            });


        }
    });



    router.post('/login',(req,res)=>{

        let email =req.body.email;
        let  password = req.body.password;


        User.findOne({email: email}).then(user => {
            if (user) {
                bcrypt.compare(password, user.password).then((returnPassword) => {
                    console.log('hello');
                    res.redirect('/');

                });
            } else {
                // req.flash('already_user','The E-mail exists,please login');
                console.log('wrong password');
                res.render('home/login',{
                    email : req.body.email,
                });

            }

        });




    });
    router.post('/post',(req,res)=> {

        const newPost = new Post({

            Title: req.body.Title,
            Describe: req.body.Describe,

        });
        newPost.save().then(savedPost => {
            //  req.flash('success_register','You are now registered,Please login');
            res.send(savedPost).status(200);
        });
    });
    */
module.exports = router;
