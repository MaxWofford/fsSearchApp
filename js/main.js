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

parseResults = function parseResults (req, parsedData) {
  var result = [];
  for (i = 0; i < parsedData.response.venues.length; i++) {
    result.push({
      id: parsedData.response.venues[i].id,
      name: parsedData.response.venues[i].name,
      location: parsedData.response.venues[i].location,
      contact: parsedData.response.venues[i].contact,
      stats: parsedData.response.venues[i].stats,
      checkins: parsedData.response.venues[i].hereNow
    });
  }
  return result;
};

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


