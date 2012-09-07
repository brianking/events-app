// module dependencies
var express = require("express");
var routes = require("./routes");
var http = require("http");
var path = require("path");

// set timezone to warsaw (this is important to ensure that date objects don't get printed as the localtime of the server)
process.env.TZ = "Europe/Warsaw";

// populate database
// TODO: this should probably have some sort of timer attached, so it's run at a regular interval instead of just when the server starts
require("./modules/database").update();

// stock express stuff (best not to modify unless you know what you're doing)
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

// this is where we tell express about the pages it should display to the user, taken from the views/index.ejs folder
app.get("/", routes.index);
app.get("/index.html", routes.index);
app.get("/schedule.html", routes.schedule);
app.get("/session.html", routes.session);
app.get("/starred.html", routes.starred);

// start the http server!
http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
