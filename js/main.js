var express     	= require('express'),
app             	= express(),
http       				= require("http"),
search 			    	= require("./search"),
foursquareConfig	= require("./config")(app);


checkUndefined = function checkUndefined (checkUndefined) {
  if (typeof checkUndefined === "undefined") {
    return checkUndefined = "None listed";
  } else {
    return checkUndefined;
  }
}

parseResults = function parseResults (req, parsedData) {
  //items is an array of venues
  var items = parsedData.response.groups[0].items;
  var result = [];
  for (i = 0; i < items.length; i++) {
    
    id = checkUndefined(items[i].venue.id);
    name = checkUndefined(items[i].venue.name);
    
    location = checkUndefined(items[i].venue.location);
    location.address = checkUndefined(location.address);
    location.postalCode = checkUndefined(location.postalCode);
    location.lat = checkUndefined(location.lat);
    location.lng = checkUndefined(location.lng);

    contact = checkUndefined(items[i].venue.contact);
    contact.phone = parsePhone(checkUndefined(contact.phone));
    contact.twitter = checkUndefined(contact.twitter);
    
    stats = checkUndefined(items[i].venue.stats);
    checkins = checkUndefined(items[i].venue.hereNow);
    price = checkUndefined(items[i].venue.price);
    price.tier = checkUndefined(price.tier);
    rating = checkUndefined(items[i].venue.rating);

    hours = checkUndefined(items[i].venue.hours);
    hours.isOpen = parseOpen(checkUndefined(hours.isOpen));
    tips = checkUndefined(items[i].tips);

    result.push({
      id: id,
      name: name,
      location: location,
      contact: contact,
      stats: stats,
      checkins: checkins,
      price: price.tier,
      rating: rating,
      open: hours.isOpen,
      url: tips[0].url
    });
  }
  return result;
};

parsePhone = function parsePhone (number) {
  if (number.split('').length != 10) 
    return "No phone number listed";
  else
    return number.slice(0,3) + "." + number.slice(3,6) + "." + number.slice(6,10);
}

parseOpen = function parseOpen (isOpen) {
  if (isOpen == true)
    return "Open";
  if (isOpen == false)
    return "Closed";
  else
    return "No information provided";
}

app.server = http.Server(app);

var query = "coffee";

app.use(express.static(__dirname + '/../views'));

app.get('/', function(req, res) {
  search(app, req.query.query, function(err, parsedData) {
    if (err) {
      return console.error("There was an error: " + err.message);
    }
    result_list = parseResults(req, parsedData);
    res.render('../views/index.ejs', result_list);
  });
});

app.server.listen(process.env.PORT || 8080);


