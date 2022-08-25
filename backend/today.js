const express = require("express");
const util = require("util");
const router = express.Router();
const fs = require('fs');
const path = require('node:path');

router.use(express.json());

router.get("", function(req,res){
    fs.readFile(path.join(__dirname,'todos.json'),(err,data)=>{
        if(err) throw err;
        let todos = JSON.parse(data)["todos"];
        var todaytodo={
            "todos":[]
        };  
        var cont=0;
        let date_ob = new Date();
        var date = date_ob.toISOString().slice(0,10);
        todos.forEach(todo => {
            if(todo["date"]==date)
                todaytodo["todos"][cont++]=todo;
        });
        res.status(200).json(todaytodo);
    });
});

module.exports = router;