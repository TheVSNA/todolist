require("dotenv").config();
const app = require("./backend/backend.js");
//const mongoose = require("mongoose");
const port = 80;


app.listen(port, () => {
    console.log('Server listening on port ',port);
});   

//code for db connection
/*
app.locals.db = mongoose.connect("mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {   
    console.log("Connected to Database");
    app.listen(port, () => {
        console.log('Server listening on port ',port);
    });   
});
*/