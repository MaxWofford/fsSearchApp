#Foursquare Search App
A node.js project that uses the Foursquare and Google Maps APIs.
Currently it is centered on Hacker School's location to provide optimal searching for Hacker Schoolers.
I plan to make the search start location more flexible and to beautify it further. 

##Dependencies
* node
* npm

##Installation


Clone & enter: 

```bash
$git clone https://github.com/ashleyglidden/fsSearchApp.git && cd fsSearchApp/
```

Install dependencies: 

```bash
$npm install
```

Add API keys to config.js:
```bash 
$touch js/config.js
```
```js
//config.js

module.exports.foursquare = {
	// Foursquare API keys in development
   'clientId' : 'YOUR_CLIENT_ID',
   'clientSecret' : 'YOUR_CLIENT_SECRET'
}

```

Run:

```bash
$node js/
```