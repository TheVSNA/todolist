const express = require("express");
const util = require("util");
const router = express.Router();
const fs = require('fs/promises');
const path = require('node:path');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post("", async function(req,res){
    var text = req.body.text;
    var date = req.body.date;
    var group = req.body.group;
    
    const data = await fs.readFile(path.join(__dirname,'todos.json'), { encoding: 'utf8' });

    todos=JSON.parse(data)["todos"];
    var newtodo = {
        "id":todos[todos.length-1]+1,
        "ischecked":false,
        "text":text,
        "date":date,
        "projectcolor":"black",
        "projectname":group
    }

    todos[todos.length]=newtodo;

    newtodos = {
        "todos":todos
    };

    fs.writeFile(path.join(__dirname,'todos.json'),JSON.stringify(newtodos),(err)=>{
        if(err) throw err;
    });

    res.redirect("/main");
});

//modify ischecked status of a todo element
router.put("/:id",async function(req,res){
    var id = req.params.id;
    var ischecked = req.body.ischecked;

    //read all todos
    const data = await fs.readFile(path.join(__dirname,'todos.json'), { encoding: 'utf8' });
    
    todos=JSON.parse(data)["todos"];
    var index=0;
    var cont=0;

    //search for todo with corresponding id
    todos.forEach(element => {
        if(element["id"]==id)
            index=cont;
        cont++;
    });

    //modify ischeched field
    todos[index]={
        "id":id,
        "ischecked":ischecked,
        "text":todos[index]["text"],
        "date":todos[index]["date"],
        "projectcolor":todos[index]["projectcolor"],
        "projectname":todos[index]["projectname"]
    };

    newtodos = {
        "todos":todos
    };

    //save 
    fs.writeFile(path.join(__dirname,'todos.json'),JSON.stringify(newtodos),(err)=>{
        if(err) throw err;
    });
    res.status(200);
});

module.exports = router;