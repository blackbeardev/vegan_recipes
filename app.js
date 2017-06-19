var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/vegan_recipes");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/recipes", function(req, res) {
    res.render("index");
});








app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});