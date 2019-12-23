
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