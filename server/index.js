
//C:\nodeproject> node index.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 
const app = express();
const port = 3001
 
app.use(express.json());
app.use(cors());
 
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "todolist"
})
 
con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
 
app.get('/getnote', (req, res) => {
    const sql = "SELECT * FROM note";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
 
app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM note where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
 
app.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE note SET `task`= ? WHERE id = ?";
  
  const values = [
    req.body.task,
    
  ];
  
  con.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
    //return res.json({Status: "Success"})
  });
});
 
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM note WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})
 
 
app.post('/create', (req, res) => {
    const task = req.body.task;
    
  
    con.query("INSERT INTO note (task) VALUES (?, ?, ?, ?)", [task], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        }
    )
})
 

 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})