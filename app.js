var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/vegan_food");

var recipeSchema = new mongoose.Schema({
    image: String,
    title: String,
    content: String
});

var Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create({
//     image: "http://veganyumminess.com/wp-content/uploads/2014/04/Vegan-Mac-and-Cheese-Square.jpg",
//     title: "Vegan Mac & Cheese",
//     content: "This is a yummy vegan mac and cheese."
// }, function(err, newRecipe) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(newRecipe);
//     }
// });

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/recipes", function(req, res) {
    Recipe.find({}, function(err, allRecipes) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {recipes: allRecipes});
        }
    });
});

app.post("/recipes", function(req, res) {
    var newRecipe = req.body.recipe;
    Recipe.create(newRecipe, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("back");
        }
    });
});

app.get("/recipes/new", function(req, res) {
    res.render("new");
});

app.get("/recipes/:id", function(req, res) {
    Recipe.findById(req.params.id, function(err, foundRecipe) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {recipe: foundRecipe});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});