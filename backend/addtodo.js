const express = require("express");
const util = require("util");
const router = express.Router();
const fs = require('fs/promises');
const path = require('node:path');

//code for database usage
//const mongoose = require("mongoose");
//const Todo = require("./models/todo");

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post("", async function(req,res){
    var text = req.body.text;
    var date = req.body.date;
    var group = req.body.group;
    
    const data = await fs.readFile(path.join(__dirname,'todos.json'), { encoding: 'utf8' });

    todos=JSON.parse(data)["todos"];
    console.log(todos.length);
    console.log(todos[todos.length-1]);



    var newtodo = {
        "id":parseInt(todos[todos.length-1]["id"])+1,
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

    //code for database usage
    /*var newest = Todo.find().sort({_id:-1}).limit(1);


    let newtodo = new Todo({
        id:newest.id+1,
        ischecked:false,
        text:text,
        date:date,
        projectcolor:"black",
        projectname:group
    });
    await newtodo.save();
    res.redirect("/main");*/
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

router.get("",async function (req,res){
    const data = await fs.readFile(path.join(__dirname,'todos.json'), { encoding: 'utf8' });
    let todos = JSON.parse(data);
    console.log(todos);
    res.status(200).json(todos);
});

module.exports = router;