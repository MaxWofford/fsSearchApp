var express     	= require('express'),
app             	= express(),
http       				= require("http"),
search 			    	= require("./search")

function parseResults (req, parsedData) {
  //items is an array of venues
  var items = parsedData.response.groups[0].items;
  var result = [];
  for (i = 0; i < items.length; i++) {

    var venue = items[i].venue
    var id = venue.id;
    var name = venue.name;
    // Foursquare already provides a formatted address and phone number for us
    var location = venue.location && venue.location.formattedAddress;
    var contact = venue.contact && venue.contact.formattedPhone;
    var stats = venue.stats;
    var checkins = venue.hereNow;
    // This will return null if venue.price is undefined
    var price = venue.price && venue.price.tier; 
    var rating = venue.rating;
    // Foursquare also gives us it's best guess if a venue is open
    var hours = venue.hours && venue.hours.isOpen; 
    var url = venue.url;

    result.push({
      id: id,
      name: name,
      location: location,
      contact: contact,
      stats: stats,
      checkins: checkins,
      price: price,
      rating: rating,
      open: hours,
      url: url
    });
  }
  return result;
};

app.server = http.Server(app);

// All assets in /views are treated as public
app.use(express.static(__dirname + '/../views'));

app.get('/', function (req, res) {
  res.render('../views/start.ejs');
});

app.get('/search', function (req, res) {
  var searchQuery = {
    query: req.query.query,
    lat: req.query.lat,
    lng: req.query.lng
  };
  search(app, searchQuery, function(err, parsedData) {
    if (err) {
      return console.error('There was an error: ' + err.message);
    }
    result_list = parseResults(req, parsedData);
    res.render('../views/index.ejs', result_list);
  });
});

// If we don't explicitly define a port for the environment, default to 8080
var port = process.env.PORT || 8080;

// 'Hello world' message gets logged to console when starting server
app.server.listen(port, function(){
  console.log('Hello world! I\'m listening on port ' + port);
});
