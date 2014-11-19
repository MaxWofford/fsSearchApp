#Foursquare Search App
A node.js app that uses the Foursquare explore and Google Maps APIs. 
Created for Hacker Schoolers (many of whom are new to NYC) to locate food and other necessities for coding. 

The user's lat/long are used to provide an optimal search experience from any location, not just Hacker School.

To do:
<br>
complete welcome page
<br>
update markers with more information and design, close automatically
<br>
beautify it further

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
