var express     	= require('express'),
app             	= express(),
http       				= require("http"),
//https 		    		= require("https"),
//router 			    	= require("./routes")(app),
search 			    	= require("./search"),
foursquareConfig	= require("./config")(app),
getRoute = '/start';

//app.engine('html', require('html').renderFile);
//var router = require('routes.js')(app);

//app.get('/', function(req, res) {
  //res.render('path/to/view', parsedData);

checkUndefined = function checkUndefined (checkUndefined) {
  if (typeof checkUndefined === "undefined") {
    return checkUndefined = "None listed";
  } else {
    return checkUndefined;
  }
}

parseResults = function parseResults (req, parsedData) {
  var venues = parsedData.response.venues

  var result = [];
  for (i = 0; i < parsedData.response.venues.length; i++) {
    
    venues[i].contact.phone = parsePhone(checkUndefined(venues[i].contact.phone));
    venues[i].location.address = checkUndefined(venues[i].location.address);

    result.push({
      id: venues[i].id,
      name: venues[i].name,
      location: venues[i].location,
      contact: venues[i].contact,
      stats: venues[i].stats,
      checkins: venues[i].hereNow
    });
  }
  return result;
};

parsePhone = function parsePhone (number) {
  //number = checkUndefined(number)
  if (number.split('').length != 10) 
    return "No phone number listed";
  else
    return number.slice(0,3) + "." + number.slice(3,6) + "." + number.slice(6,10);
}

app.server = http.Server(app);

app.get('/', function(req, res) {
  search(app, req.query.query, function(err, parsedData) {
    if (err) {
      return console.error("There was an error: " + err.message);
    }
    result_list = parseResults(req, parsedData);
    res.render('../views/index.ejs', result_list);
    //parsedData.forEach(function(){
      //do something with the data
      //console.log(parsedData);
      //res.write(JSON.stringify(parseResults(req, parsedData)));
      //res.write(JSON.stringify(parsedData));
      //res.end();
    //})
  });
});

app.server.listen(8080);


