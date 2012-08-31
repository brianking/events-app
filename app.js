// module dependencies

var express = require("express");
var routes = require("./routes");
var http = require("http");
var path = require("path");

// populate database

require("./modules/database").update();

// stock express stuff

var app = express();

app.configure(function(){
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require("less-middleware")({ src: __dirname + "/public" }));
  app.use(express.static(path.join(__dirname, "public")));
});

app.configure("development", function(){
  app.use(express.errorHandler());
});

app.get("/", routes.index);
app.get("/index.html", routes.index);
app.get("/schedule.html", routes.schedule);
app.get("/session.html", routes.session);
app.get("/starred.html", routes.starred);

http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
