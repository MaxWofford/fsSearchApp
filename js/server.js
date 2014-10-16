var config = {
  'secrets' : {
    'clientId' : 'SDSGM5KCYH2APPOD1GDDA5NT312Q1BOZY5FQYJDVVEDYUBY2',
    'clientSecret' : '5GK2Q4GFOI0W3KQYEKM1KYKGJKJIRDIN0RAH5OI1WU4CRIQS',
 	'redirectUrl' : 'http://localhost:8080/callback'
  }

}

var express     = require('express'),
app             = express(),
foursquare      = require('node-foursquare')(config),
sys             = require("sys"),
my_http         = require("http"),
path            = require("path"),
url             = require("url"),
filesys         = require("fs");

app.get('/login', function(req, res) {
	console.log("HELLO");
	res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
	res.end();
});

app.get('/callback', function(req, res) {

	foursquare.getAccessToken({ code: req.query.code }, function (error, accessToken) {
		if (error) {

			res.send('An error was thrown: ' + error.message);
		}
		else{
			// Save the accessToken and redirect
			var token = accessToken;
			console.log(token);
			return token;

		}
	});
});

var server = app.listen(8080, function (){
  
  var host = server.address().address
  var port = server.address().port

  console.log('app listening at http://%s:%s', host, port)

})

