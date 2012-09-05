// setup database connection
var cradle = require("cradle");
var db = new(cradle.Connection)().database("mozcamp-app");

// each view should be exported here and loaded in the ../app.js file
exports.index = function(req, res){
  res.render("index");
};

exports.schedule = function(req, res){
  // this is where we get the stuff from the database
  db.get("schedule", function(err, doc){
    res.render("schedule", {days: doc.days});
  });
};

exports.session = function(req, res){
  // TODO: currently the session page just displays a stock example page,
  // we're going to want to put some useful info in this which will have
  // to be put in the database by something else
  res.render("session");
};

exports.starred = function(req, res){
  res.render("starred");
};
