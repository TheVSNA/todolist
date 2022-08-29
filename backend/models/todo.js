var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("Todo", new Schema({
    id: Number,
    ischecked: Boolean,
    text: String,
    date: String,
    projectcolor: String,
    projectname: String
}));