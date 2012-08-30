exports.index = function(req, res){
  res.render("index");
};

exports.schedule = function(req, res){
  res.render("schedule");
};

exports.session = function(req, res){
  res.render("session");
};

exports.starred = function(req, res){
  res.render("starred");
};
