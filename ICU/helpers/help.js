const mysql = require('mysql2');
let sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'icu'
});

let success = 400;
let fail = 404;
module.exports =
    {
    insert: async function(req, res, fname, lname, ssn, id,  address, position, bd, depart, email, gender, phone, degree,password,confirm_password)
    {
        let status = 404;

        if (password !== confirm_password)
        {

            console.log("passwords don't match");}
        else{
            await  sqlConnection.query(`INSERT INTO doctor(F_Name,L_Name,SSN,ID,Address,Position,Degree,birth-of-date,Department,E-mail,Password)VALUES('${fname}','${lname}','${ssn}','${id}' ,'${address}','${position}','${degree}','${bd}','${depart}','${email}','${password}')`,(err, rows, fileds) => {
                    if (!err) {

                        console.log('Doctor inserted');
                        status = 400;

                    } else {
                        console.log(err);
                    }
            });


        }
        return status
    }};