// setup database connection
var cradle = require("cradle");
var db = new(cradle.Connection)().database("mozcamp-app");

exports.index = function(req, res){
  res.render("index");
};

exports.schedule = function(req, res){
  db.get("schedule", function(err, doc){
    res.render("schedule", {items: doc.items});
  });
};

exports.session = function(req, res){
  res.render("session");
};

exports.starred = function(req, res){
  res.render("starred");
};
