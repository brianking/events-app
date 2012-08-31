// setup database connection
var cradle = require("cradle");
var db = new(cradle.Connection)().database("mozcamp-app");

// get schedule from wiki
exports.update = function(){
  require("./get-schedule").getSchedule(function(schedule){

    db.save("schedule", schedule);

   });
}
