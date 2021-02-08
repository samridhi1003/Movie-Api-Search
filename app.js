//================================
// SETUP
//================================

// Installize variables
var express = require("express");
var app = express();
var request = require("request");

//Set view engine
app.set("view engine", "ejs");

//================================
// ROUTES
//================================

// home route
app.get("/", function(req, res) {
  res.render("search");
});
// results route
app.get("/results", function(req, res) {
  console.log(req.query.search);
  var url = "https://www.omdbapi.com/?apikey=ba0a397f&s=" + req.query.search;
  request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var resultsdata = JSON.parse(body);
      res.render("results", {results: resultsdata});
    } else {
      console.log(error);
    }
  });
});


//================================
// SERVER SET UP
//================================

app.listen(3001, "localhost", function() {
  console.log("Movie Search API is running on 3001");
})
