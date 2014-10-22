function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(40.72078, -74.001119)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
  document.body.appendChild(scripts);
}

window.onload = loadScript;
