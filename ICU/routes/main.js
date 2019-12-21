const express = require('express');
const router = express.Router();
//const User = require('../../models/User');
//const Post = require('../../models/Post');
const bcrypt = require('bcryptjs');

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
    res.render('home/signUp1');
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
