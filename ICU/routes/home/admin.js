const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});
router.get('/admin', (req, res) => {
    res.render('layouts/admin')
});

// //select all doctors
// router.get('/', (req,res)=>{
//     let sql =  'SELECT * FROM doctor'
//     let connection =  sqlConnection.query(sql, (err, rows, fields) => {
//         if (!err) {
//             res.render('home/doctor',{doctor : rows});
//         } else {
//             console.log(err);

//         }
//     });
// });

module.exports = router;