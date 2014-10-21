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

        return {
          id: parsedData.response.venues[0].id,
          name: parsedData.response.venues[0].name,
          location: parsedData.response.venues[0].location,
          contact: parsedData.response.venues[0].contact,
          stats: parsedData.response.venues[0].stats,
          checkins: parsedData.response.venues[0].hereNow
        };
};

app.server = http.Server(app);

app.get('/', function(req, res) {
  search(app,  function(err, parsedData) {
    if (err) {
      return console.error("There was an error: " + err.message);
    }
    //res.render('path/to/view', parseResults(req, parsedData));
    //parsedData.forEach(function(){
      //do something with the data
      //console.log(parsedData);
      res.write(JSON.stringify(parseResults(req, parsedData)));
     // res.write(JSON.stringify(parsedData));
      res.end();
    //})
  });
});

app.server.listen(8080);


