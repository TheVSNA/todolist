const express = require("express");
const util = require("util");
const router = express.Router();
const fs = require('fs/promises');
const path = require('node:path');

router.use(express.json());
router.use(express.urlencoded());

router.post("",async function (req,res){
    var group = req.body.groupname;
    var color = req.body.color;
    var icon = req.body.icon;

    if(icon == "" || icon == undefined)
        icon = "fa fa-user";
    
    const data = await fs.readFile(path.join(__dirname,'projects.json'), { encoding: 'utf8' });

    groups = JSON.parse(data)["projects"];

    groups[groups.length] = {
        "name":group,
        "icon":icon,
        "color":color
    }

    newgroups ={
        "projects":groups
    }
    fs.writeFile(path.join(__dirname,'projects.json'),JSON.stringify(newgroups),(err)=>{
        if(err) throw err;
    });
    res.status(201).redirect("/main");
});

router.get("",async function(req,res){
    const data = await fs.readFile(path.join(__dirname,'projects.json'), { encoding: 'utf8' });
    res.status(200).json(JSON.parse(data));
});

module.exports = router;