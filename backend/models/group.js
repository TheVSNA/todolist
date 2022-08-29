var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("Request", new Schema({
    name: String,
    icon: String,
    color: String,
    iconcode: String
}));