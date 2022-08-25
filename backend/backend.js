const express = require("express");
const app = express();
var util = require("util");
const path = require('node:path');

const today = require('./today.js');
const addtodo = require('./addtodo.js');
const groups = require('./groups.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', express.static('html'));
app.use('/style', express.static('style'));
app.use('/script', express.static('script'));
app.use('/imgs', express.static('imgs'));

/*app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    console.log(util.inspect(req.body,{showHidden: false, depth: null}))
    next()
});*/

app.use("/main",function(req,res){
    var mypath = path.join(__dirname,"../html/index.html");
    res.sendFile(mypath);
});

app.use('/today', today);
app.use('/managetodo', addtodo);
app.use('/groups',groups);

module.exports = app;