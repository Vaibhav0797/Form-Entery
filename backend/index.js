const mysql = require ('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const { json } = require('body-parser');

app.use(cors());
app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'formentry',
    multipleStatements: true
})

mysqlConnection.connect((err)=>{
    if(!err)
    console.log("DB connection succeded");
    else
    console.log("Connection Failed \n Error", JSON.stringify(err,undefined,2) );
});
app.listen(4000, ()=> console.log("Express Server Is Running"));

app.get('/formdata', (req,res)=>{
    mysqlConnection.query('Select * from formdata', (err, rows, fields)=>{
        if(err){
            return err;
        }else{
            return res.json({
                data:rows
            })
        }
    })
});

app.post('/formdata', (req,res)=>{
    let data = req.body;
    var sql = 'INSERT INTO formdata (SrNo,FirstName,LastName,Email,Contact,File) VALUES (?,?,?,?,?,?)'
    mysqlConnection.query(sql,[req.body.SrNo,req.body.FirstName,req.body.LastName,req.body.Email,req.body.Contact,req.body.File], (err)=>{
        if(!err)
            res.send('Inserted Successfully');
        else
            console.log(err);
    })
});