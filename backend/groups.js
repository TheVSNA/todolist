const express = require("express");
const util = require("util");
const router = express.Router();
const fs = require('fs/promises');
const path = require('node:path');
const { group } = require("console");

//code for database usage
//const mongoose = require("mongoose");
//const Group = require("./models/group");

router.use(express.json());
router.use(express.urlencoded());

router.post("",async function (req,res){
    var group = req.body.groupname;
    var color = req.body.color;
    var icon = req.body.icon;
    var iconcode = req.body.iconcode;
    console.log(iconcode);

    if(icon == "" || icon == undefined)
        icon = "fa fa-user";
    
    const data = await fs.readFile(path.join(__dirname,'projects.json'), { encoding: 'utf8' });

    groups = JSON.parse(data)["projects"];

    groups[groups.length] = {
        "name":group,
        "icon":icon,
        "color":color,
        "iconcode":iconcode
    }

    newgroups ={
        "projects":groups
    }
    fs.writeFile(path.join(__dirname,'projects.json'),JSON.stringify(newgroups),(err)=>{
        if(err) throw err;
    });
    res.status(201).redirect("/main");

    //code for database usage
    /*let newgroup = new Group({
        name:group,
        icon:icon,
        color:color,
        iconcode:iconcode
    });
    await newgroup.save();
    res.status(201).redirect("/main");*/

});

router.get("",async function(req,res){
    const data = await fs.readFile(path.join(__dirname,'projects.json'), { encoding: 'utf8' });
    res.status(200).json(JSON.parse(data));

    //code for database usage
    /*var jsongroups = {
        "projects":[]
    }
    var i =0;
    var groups = await group.find();
    groups.forEach(element => {
        jsongroups["projects"][i++]={
            "name":element.name,
            "icon":element.icon,
            "color":element.color,
            "iconcode":element.iconcode
        }
    });
    res.status(200).send(jsongroups);*/
});

module.exports = router;