// okay, this is the worst written piece of code ever
// yes, that means it's worse than the original netscape codebase
// heck... it's even worse than the internet explorer codebase!
// I think I'll document this later, but if you have any questions, just send them my way! (leo on IRC, leo@mozilla.org.uk)
var request = require("request");
var moment = require("moment");

var parseTime = function(time){
    var parsedTime = time.replace(/time=/, "").replace(/am/, "").replace(/pm/, "").replace(/ /g, "").split("-");
    if(parsedTime[0] == "Noon") parsedTime[0] = "12:00";
    if(parsedTime[1] == "Noon") parsedTime[1] = "12:00";
    return parsedTime;
}

var parseTable = function(table){
    var x = [];
    table.split("{|")[1].split("|}")[0].replace(/ class="wikitable" \|/, "").replace(/\|-/g, "").replace(/{{EUCamp12HeaderRow}}/g, "").replace(/}}/g, "").split("{{").forEach(function(element){
        if(element == "") return;
        x.push(element.split("|"));
    });
    return x;
}

var createRow = function(elements, day){
    var time = parseTime(elements[1]);
    var sessions = [];
    elements.forEach(function(element, index){
        if(index < 2) return;
        var element = element.replace(/all=/, "").replace(/Main=/, "").replace(/Room 1=/, "").replace(/Room 2=/, "").replace(/Room 3=/, "").replace(/Room 4=/, "").replace(/Room 5=/, "");
        if(/<hr\/?>/.test(element)){
            sessions.push({
                single: false,
                sessions: [{
                    title: element.replace(/<hr>.*/, "").replace(/ *<small>.*<\/small> */, "").replace(/^.*\[\S* /, "").replace(/\].*$/, ""),
                    link: element.replace(/<hr>.*/, "").replace(/ *<small>.*<\/small> */, "").replace(/^.*\[ *https?\:\/\/wiki\.mozilla\.org\//, "").replace(/\].*$/, "").replace(" " + element.replace(/^.*\[\S* /, "").replace(/\].*$/, ""), ""),
                    time: element.replace(/^ *<small>/, "").replace(/<\/small>.*/, "")
                },{
                    title: element.replace(/.*<hr>/, "").replace(/ *<small>.*<\/small> */, "").replace(/^.*\[\S* /, "").replace(/\].*$/, ""),
                    link: element.replace(/.*<hr>/, "").replace(/ *<small>.*<\/small> */, "").replace(/^.*\[ *https?\:\/\/wiki\.mozilla\.org\//, "").replace(/\].*$/, "").replace(" " + element.replace(/^.*\[\S* /, "").replace(/\].*$/, ""), ""),
                    time: element.replace(/^.*<hr><small>/, "").replace(/<\/small>.*/, "")
                }]
            });
        } else if(/^ *\[\[/.test(element)){
            return;
        } else if(/\]\] *$/.test(element)){
            sessions.push({
                title: element.replace(/]]$/, ""),
                link: elements[index-1].replace(/^.*\[\[/, ""),
                single: true
            });
        } else if(/^ *\[ *https?\:\/\/wiki\.mozilla\.org\//.test(element)) {
            sessions.push({
                title: element.replace(/^.*\[\S* /, "").replace(/\].*$/, ""),
                link: element.replace(/^.*\[ *https?\:\/\/wiki\.mozilla\.org\//, "").replace(/\].*$/, "").replace(" " + element.replace(/^.*\[\S* /, "").replace(/\].*$/, ""), ""),
                single: true
            });
        } else {
            sessions.push({
                title: element,
                link: false,
                single: true
            });
        }
    });
    var start = new Date("2012-09-" + day + "T" + time[0] + "+0200");
    var end = new Date("2012-09-" + day + "T" + time[1] + "+0200");
    /*console.log({
        time: [start, end],
        sessions: sessions
    });*/
    return {
        time: [start, end],
        sessions: sessions
    };
}

exports.getSchedule = function(callback){
    request('http://wiki.mozilla.org/api.php?action=query&prop=revisions&format=json&rvprop=content&rvlimit=1&titles=MozCampEU2012%2Fschedule', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);

            var wiki = body.query.pages["57073"].revisions[0]["*"].replace(/\n/g, "").split("==Saturday, September 8th==")[1].split("==Sunday, September 9th==");

            var forDatabase = {
                type: "schedule",
                days: [{
                    day: "Saturday",
                    items: []
                }, {
                    day: "Sunday",
                    items: []
                }]
            };

            parseTable(wiki[0]).forEach(function(element){
                forDatabase.days[0].items.push(createRow(element, "08"));
            });

            parseTable(wiki[1]).forEach(function(element){
                forDatabase.days[1].items.push(createRow(element, "09"));
            });

            callback(forDatabase);
        }
    });
}
