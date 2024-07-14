
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const url = require("url");
let sql;

//connect db 
const db = new sqlite3.Database('https://github.com/alihaja/nodejssqliteapi/blob/master/comment.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
});

app.use(bodyParser.json());

//postapi
app.post("/", (req, res) => {
    try{
        const { fname, comment } = req.body;
        sql = "INSERT INTO tbcomment(fname, comment) VALUES (?,?)";
        db.run(sql,[fname, comment],(err)=>
        {
            if(err) return res.json({status:300, success: false, error: err});

            console.log("succesfull", fname, comment);
        });
        res.json({
            status: 200,
            succcess: true
        })

    }
    catch(error){
        return res.json({
            status:400,
            succcess: false
        });
    }
});

//get request
app.get("/", (req, res) => {
    sql = "SELECT * FROM tbcomment";
    try{
        db.all(sql, [], (err, rows) => {
            if(err) return res.json({status:300, success: false, error: err});

            if(rows.length < 1) 
                return res.json({status:300, success: false, error: "no data"});
          
            return res.json({ status:200, data: rows, succcess: true });
        });
    }
    catch(error){
        return res.json({
            status:400,
            succcess: false
        });
    }
});
app.listen(3000);
