const sqlite3 = require('sqlite3').verbose();
let sql;



//connect db 
const db = new sqlite3.Database('./comment.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
});


sql = 'CREATE TABLE tbcomment(id INTEGER PRIMARY KEY, fname, comment)';
db.run(sql);